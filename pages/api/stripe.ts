import type { NextApiRequest, NextApiResponse } from "next"
import {
	AUTH_ENDPOINT,
	AUTH_TOKEN_KEY,
	CART_ENDPOINT,
	CART_TOKEN_KEY,
	REFRESH_TOKEN_KEY,
} from "@lib/constants"
import { Stripe } from "stripe"
import checkAuthAPI from "@lib/wp/utils/checkAuthAPI"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2022-11-15" })

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<STRIPE_PaymentIntentType>,
) {
	const inputData: { tokens?: WP_AuthTokensType } =
		typeof req.body === "string" ? JSON.parse(req.body) : req.body
	const cookies = req.cookies
	const { tokens } = await checkAuthAPI({ cookies, tokens: inputData.tokens })

	const requestBody: WC_CartEndpointInputType = {
		action: "FETCH",
		tokens,
	}

	const data: API_CartResponseType = await (
		await fetch(CART_ENDPOINT, {
			method: "POST",
			body: JSON.stringify(requestBody),
		})
	).json()

	const { cart } = data

	const total = parseFloat(cart?.totals.total_price ?? "0.00")

	if (total > 0) {
		const paymentIntent = await stripe.paymentIntents.create({
			amount: total,
			currency: "usd",
			payment_method_types: ["card"],
		})
		return res.json({
			paymentIntentId: paymentIntent.id,
			clientSecret: paymentIntent.client_secret,
		})
	} else {
		return res.json({
			paymentIntentId: null,
			clientSecret: null,
		})
	}
}
