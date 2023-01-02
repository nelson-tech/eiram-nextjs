// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"

import { CART_TOKEN_KEY, REST_CART, AUTH_ENDPOINT } from "@lib/constants"
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
	let incomingCartKey = tokens.cart

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

		// Add authTokens if present
		tokens.auth && (headers["Authorization"] = `Bearer ${tokens.auth}`)

		// Add cartKey if present
		tokens.cart && (headers["Nonce"] = tokens.cart)

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

			incomingCartKey = addResponse && addResponse.headers.get("nonce")

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

			incomingCartKey = updatedResponse.headers.get("nonce")

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

			incomingCartKey = removeResponse.headers.get("nonce")

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

			incomingCartKey = cartResponse.headers.get("nonce")

			const cart: WC_CartType = await cartResponse.json()

			body.cart = cart

			break
		default:
			break
	}

	if (tokens.cart != incomingCartKey) {
		newCookies.push(
			`${CART_TOKEN_KEY}=${incomingCartKey}; HttpOnly; Path=/; SameSite=None; Secure; expires=${new Date(
				Date.now() + 120 * 24 * 60 * 60 * 1000,
			).toUTCString()}`,
		)
	}

	if (newCookies.length > 0) {
		body.authData.newCookies = newCookies
	}

	res.setHeader("set-cookie", newCookies).status(200).json(body)

	return body
}
