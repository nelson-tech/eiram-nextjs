// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"

import { CART_NONCE_KEY, REST_CART, CART_TOKEN_KEY } from "@lib/constants"
import checkAuthAPI from "@lib/wp/utils/checkAuthAPI"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<API_CartResponseType>,
): Promise<API_CartResponseType> {
	const inputData: WC_CartEndpointInputType =
		typeof req.body === "string" ? JSON.parse(req.body) : req.body

	// Read cookies
	const cookies = req.cookies
	const authData = await checkAuthAPI({ cookies, tokens: inputData.tokens })

	const { tokens } = authData
	let incomingCartNonce = tokens.nonce
	let incomingCartToken = tokens.cart

	let body: API_CartResponseType = { authData, cart: null }

	const newCookies: string[] = [].concat(authData.newCookies)

	const getFetchParams = ({
		cartPath,
		body,
		method = "GET",
	}: {
		cartPath: string
		body?: string
		method?: "GET" | "POST" | "DELETE"
	}) => {
		const headers = { "content-type": "application/json" }

		// Add auth token if present
		tokens.auth && (headers["Authorization"] = `Bearer ${tokens.auth}`)

		// Add cart token if present
		tokens.cart && (headers["Cart-Token"] = tokens.cart)

		// Add cart nonce if present
		tokens.nonce && (headers["Nonce"] = tokens.nonce)

		const uri = REST_CART + cartPath

		const fetchParams: RequestInit = {
			method,
			headers,
			body,
		}

		return { uri, fetchParams }
	}

	switch (inputData.action) {
		case "ADDITEM":
			const addParams = getFetchParams({
				cartPath: "/cart/add-item",
				body: JSON.stringify(inputData.input),
				method: "POST",
			})

			const addResponse = await fetch(addParams.uri, addParams.fetchParams).catch((e) =>
				console.warn(e),
			)

			incomingCartNonce = addResponse && addResponse.headers.get("nonce")
			incomingCartToken = addResponse && addResponse.headers.get("cart-token")

			const data: WC_CartType = addResponse && (await addResponse?.json())

			body.cart = data

			break

		case "UPDATEITEM":
			// Just checking auth state

			const updateParams = getFetchParams({
				cartPath: `/cart/update-item?key=${inputData.itemKey ?? ""}`,
				body: JSON.stringify({
					item_key: inputData.itemKey,
					quantity: inputData.quantity,
				}),
				method: "POST",
			})

			const updatedResponse = await fetch(updateParams.uri, updateParams.fetchParams)

			incomingCartNonce = updatedResponse && updatedResponse.headers.get("nonce")
			incomingCartToken = updatedResponse && updatedResponse.headers.get("cart-token")

			const updatedCart: WC_CartType = await updatedResponse?.json()

			body.cart = updatedCart
			break
		case "REMOVEITEM":
			// Just checking auth state

			const removeParams = getFetchParams({
				cartPath: `/cart/remove-item?key=${inputData.itemKey ?? ""}`,
				body: JSON.stringify({
					item_key: inputData.itemKey,
				}),
				method: "POST",
			})

			const removeResponse = await fetch(removeParams.uri, removeParams.fetchParams)

			incomingCartNonce = removeResponse && removeResponse.headers.get("nonce")
			incomingCartToken = removeResponse && removeResponse.headers.get("cart-token")

			const status: WC_CartType = await removeResponse?.json()

			body.cart = status
			break
		case "CHECKOUT":
			const checkoutParams = getFetchParams({
				cartPath: "/checkout",
				body: JSON.stringify(inputData.input),
				method: "POST",
			})

			const checkoutResponse = await fetch(checkoutParams.uri, checkoutParams.fetchParams)

			const checkoutData: WC_CheckoutResponseType = await checkoutResponse.json()

			body.checkout = checkoutData
			break
		case "FETCH":
			// Just fetching cart

			const { uri, fetchParams } = getFetchParams({ cartPath: "/cart" })

			const cartResponse = await fetch(uri, fetchParams)

			incomingCartNonce = cartResponse && cartResponse.headers.get("nonce")
			incomingCartToken = cartResponse && cartResponse.headers.get("cart-token")

			const cart: WC_CartType = await cartResponse.json()

			body.cart = cart

			break
		default:
			break
	}

	if (tokens.nonce != incomingCartNonce) {
		newCookies.push(
			`${CART_NONCE_KEY}=${incomingCartNonce}; HttpOnly; Path=/; SameSite=None; Secure; expires=${new Date(
				Date.now() + 120 * 24 * 60 * 60 * 1000, // 120 Days
			).toUTCString()}`,
		)
	}

	if (tokens.cart != incomingCartToken) {
		newCookies.push(
			`${CART_TOKEN_KEY}=${incomingCartToken}; HttpOnly; Path=/; SameSite=None; Secure; expires=${new Date(
				Date.now() + 2 * 24 * 60 * 60 * 1000, // 2 Days
			).toUTCString()}`,
		)
	}

	if (newCookies.length > 0) {
		body.authData.newCookies = newCookies
	}

	res.setHeader("set-cookie", newCookies).status(200).json(body)

	return body
}
