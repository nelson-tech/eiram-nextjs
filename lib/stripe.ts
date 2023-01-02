"use client"

import { CardNumberElement } from "@stripe/react-stripe-js"
import type { Stripe, StripeElements } from "@stripe/stripe-js"
import { STRIPE_ENDPOINT } from "./constants"

export type StripeClientType = Stripe | null | undefined

export type CardElementType = any

export type HandleStripeInputType = {
	stripe: StripeClientType
	elements: StripeElements | undefined
}

export const createPaymentIntent = async () => {
	const response = await fetch(STRIPE_ENDPOINT, {
		method: "GET",
	})
	const paymentIntentResponse: STRIPE_PaymentIntentType = await response.json()

	return paymentIntentResponse
}

export async function confirmCardPayment({
	elements,
	stripe,
	clientSecret,
}: {
	elements: StripeElements
	stripe: Stripe
	clientSecret: string
}) {
	// create Stripe confirm payment method data
	// TODO add more data for Stripe to hold if necessary.  Receipt email is usually a good idea
	const paymentMethod = {
		payment_method: {
			card: elements.getElement(CardNumberElement)!,
			// billing_details: {},
			// shipping: {},
			// receipt_email: ''
		},
	}
	// use Stripe client secret to process card payment method

	const result = await stripe.confirmCardPayment(clientSecret, paymentMethod)

	return result
}

export const handleStripe = async ({ stripe, elements }: HandleStripeInputType) => {
	// Guard against stripe or elements not being available
	if (!stripe || !elements) {
		throw Error(`stripe or elements undefined`)
	}

	// confirm payment with stripe
	const result = stripe ? await stripe.confirmPayment({ elements, redirect: "if_required" }) : null

	return result
}
