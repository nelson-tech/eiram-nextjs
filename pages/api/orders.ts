import type { NextApiRequest, NextApiResponse } from "next"
import { REST_BASE } from "@lib/constants"
import { Stripe } from "stripe"
import checkAuthAPI from "@lib/wp/utils/checkAuthAPI"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2022-11-15" })

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	const inputData: { orderId?: string | number; tokens?: WP_AuthTokensType } =
		req.body && (typeof req.body === "string" ? JSON.parse(req.body) : req.body)

	const cookies = req.cookies
	const authData = await checkAuthAPI({ cookies, tokens: inputData.tokens })

	const { tokens } = authData

	// Get customer ID
	const userData: WP_AUTH_UserDataType | null = tokens?.user ? JSON.parse(tokens.user) : null
	let customerId = userData?.id

	if (!customerId) {
		const customerResponse = await fetch(REST_BASE + "/wp/v2/users/me", {
			headers: { Authorization: `Bearer ${tokens.auth}` },
		})

		const customerData = await customerResponse.json()

		customerId = customerData?.id
	}

	if (customerId) {
		let url = REST_BASE + "/wc/v3/orders"

		if (inputData?.orderId) {
			url += `/${inputData.orderId}`
		}

		url += "?customer=" + customerId

		const clientKey = process.env.WOO_CLIENT_KEY
		const clientSecret = process.env.WOO_CLIENT_SECRET

		const headers = {
			Authorization: `Basic ${Buffer.from(`${clientKey}:${clientSecret}`, "utf-8").toString(
				"base64",
			)}`,
		}

		const ordersParams: RequestInit = { headers, method: "GET" }

		const data = await fetch(url, ordersParams).catch((e) => console.warn(e))

		return res.json(data && (await (await data).json()))
	}

	return res.status(200).json(null)
}
