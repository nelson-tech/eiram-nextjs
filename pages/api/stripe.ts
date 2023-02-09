import type { NextApiRequest, NextApiResponse } from "next"
import { Stripe } from "stripe"

import { CLIENT_Tokens_Type } from "@lib/types/auth"
import getClient from "@api/client"
import { GetCartForStripeDocument } from "@api/codegen/graphql"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2022-11-15" })

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<STRIPE_PaymentIntentType>,
) {
	const inputData: { tokens?: CLIENT_Tokens_Type } =
		typeof req.body === "string" ? JSON.parse(req.body) : req.body

	const client = getClient(inputData.tokens)

	const cartData = await client.request(GetCartForStripeDocument)

	const { cart } = cartData

	const total = parseFloat(cart?.total ?? "0.00") * 100

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
