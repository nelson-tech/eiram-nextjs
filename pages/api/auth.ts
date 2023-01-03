// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"

import {
	AUTH_TOKEN_KEY,
	REFRESH_TOKEN_KEY,
	CART_NONCE_KEY,
	REST_WP,
	FRONTEND_BASE,
	USER_TOKEN_KEY,
} from "@lib/constants"
import getCart from "@lib/wp/api/getCart"
import checkAuthAPI from "@lib/wp/utils/checkAuthAPI"
import loginOrRefresh from "@lib/wp/api/loginOrRefresh"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<API_AuthResponseType>,
) {
	const data: API_AuthInputType = typeof req.body === "string" ? JSON.parse(req.body) : req.body

	const cookies = req.cookies

	const authData = await checkAuthAPI({ cookies, tokens: data.tokens })

	let { tokens } = authData

	// Set user from authCheck or from cookie/token
	const user = authData.user ? authData.user : tokens.user ? JSON.parse(tokens.user) : null

	let body: API_AuthResponseType = {
		...authData,
		user: { ...user, orderCount: 0, openOrders: [] },
		needsRefresh: null,
	}

	let newCookies: string[] = [].concat(authData.newCookies)

	const setUserOrders = async (user?: WP_AUTH_UserDataType) => {
		const response = await fetch(FRONTEND_BASE + "/api/orders", {
			method: "POST",
			body: JSON.stringify({ tokens }),
		})

		const data: WC_Order[] = await response.json()

		const orderCount = data.length
		const openOrders = data.filter((order) => order.status.toLowerCase() === "processing")

		if (body.user) {
			body.user.orderCount = orderCount
			body.user.openOrders = openOrders
		} else if (user) {
			body.user = { ...user, orderCount, openOrders }
		}
	}

	const setNewResponse = async (response: API_AuthCheckResultType) => {
		response.tokens && (tokens = response.tokens)
		response.isAuth && (body.isAuth = response.isAuth)
		response.user && (await setUserOrders(response.user))

		response.newCookies && (newCookies = newCookies.concat(response.newCookies))
	}

	switch (data.action) {
		case "LOGIN":
			const response = await loginOrRefresh({ tokens, loginInput: data.input })

			await setNewResponse(response)
			// TODO - Handle errors

			break

		case "REGISTER":
			const appUser = process.env.API_APPLICATION_USER
			const appPassword = process.env.API_APPLICATION_PASSWORD

			const registerInput = data.input

			const headers = {
				Authorization: `Basic ${Buffer.from(`${appUser}:${appPassword}`, "utf-8").toString(
					"base64",
				)}`,
				"content-type": "application/json",
			}

			const fetchParams: RequestInit = {
				headers,
				method: "POST",
				body: JSON.stringify(registerInput),
			}

			const registerResponse = await fetch(REST_WP + "/users", fetchParams)

			console.log("REGISTRATION HEADERS", registerResponse.headers)
			const registerData: WP_RegistrationResponseType = await registerResponse.json()

			console.log("REGISTRATION DATA", registerData)
			if (registerData.id) {
				const response = await loginOrRefresh({
					tokens,
					loginInput: {
						username: registerInput.username,
						password: registerInput.password,
					},
				})
				await setNewResponse(response)
			}

			break

		case "LOGOUT":
			// Expire auth cookies

			newCookies.push(
				`${AUTH_TOKEN_KEY}=deleted; Path=/; SameSite=None; Secure; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
				`${REFRESH_TOKEN_KEY}=deleted; Path=/; SameSite=None; Secure; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
				`${USER_TOKEN_KEY}=deleted; Path=/; SameSite=None; Secure; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
			)
			tokens.auth = null
			tokens.refresh = null

			break

		case "CART":
			const newCartKey = data.cartKey

			newCartKey &&
				newCartKey != tokens.cart &&
				newCookies.push(
					`${CART_NONCE_KEY}=${newCartKey}; HttpOnly; Path=/; SameSite=None; Secure; expires=${new Date(
						Date.now() + 120 * 24 * 60 * 60 * 1000,
					).toUTCString()}`,
				)
			tokens.cart = newCartKey
			break

		case "SET":
			// Simply set new cookies from client call
			newCookies.push(data.newCookies)

		case "INIT":
			// Initial auth call, check for user data

			if (body.user?.id) {
				// User exists. Get data.

				// Get orders
				await setUserOrders()
			}

			// Get cart
			const cartData = await getCart(tokens)
			cartData.authData.newCookies && (newCookies = newCookies.concat(cartData.authData.newCookies))
			cartData.cart && (body["cart"] = cartData.cart)

			if (newCookies.length > 0) {
				// Initial call can't set cookies because the server is calling (not client)
				// If newCookies exist, send in response for client call to set
				body.needsRefresh = newCookies.join()
			}

			break
		default:
			console.log("Just Checking")

			break
	}

	const finalBody: API_AuthResponseType = {
		...body,
		tokens,
	}

	return res.setHeader("set-cookie", newCookies).status(200).json(finalBody)
}
