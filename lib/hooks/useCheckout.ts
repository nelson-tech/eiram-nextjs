"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CreatePaymentMethodCardData } from "@stripe/stripe-js"
import { CardElementComponent, useElements, useStripe } from "@stripe/react-stripe-js"

import getClient from "@api/client"
import { CheckoutDocument, CheckoutInput, Customer, MetaDataInput } from "@api/codegen/graphql"
import useAlerts from "@lib/hooks/useAlerts"
import useCart from "@lib/hooks/useCart"
import setCookie from "@lib/utils/setCookie"
import { CART_TOKEN_KEY } from "@lib/constants"
import useAuth from "./useAuth"

type ConfirmPaymentPropsType = {
	CardElement: CardElementComponent
	customerEmail: string | null | undefined
	input: CheckoutInput
}

type CreateOrderPropsType = {
	input: CheckoutInput
	metadata: MetaDataInput[]
}

const useCheckout = (stripeData: STRIPE_PaymentIntentType) => {
	const router = useRouter()

	const [loading, setLoading] = useState(false)

	const stripe = useStripe()
	const elements = useElements()

	const { openAlert } = useAlerts()
	const { updateCustomer } = useAuth()
	const { clearCart } = useCart()

	const createOrder = async ({ input, metadata }: CreateOrderPropsType) => {
		const client = getClient()

		const finalCheckoutInput: CheckoutInput = {
			...input,
			metaData: [...(input?.metaData ?? []), ...(metadata ?? [])],
		}

		// Send finalCheckoutInput to API to create a new order
		const checkoutData = await client.request(CheckoutDocument, { input: finalCheckoutInput })

		console.log("Checkout Data", checkoutData.checkout)

		if (checkoutData?.checkout?.result) {
			const orderNumber = checkoutData.checkout.order?.orderNumber
			orderNumber &&
				router.push(`/thanks${orderNumber ? `?orderNumber=${orderNumber}` : ""}`, {
					forceOptimisticNavigation: true,
				})

			switch (checkoutData.checkout.result) {
				case "success":
					// Checkout was successful

					openAlert({
						kind: "success",
						primary: "Order Placed Successfully!",
					})

					break
				default:
					openAlert({
						kind: "error",
						primary: "Error submitting order to API.",
						secondary: "We will contact you once we've resolved the issue.",
						timeout: 3000,
					})
					break
			}

			const customer = checkoutData.checkout.customer as Customer
			await updateCustomer(customer)

			clearCart()

			setLoading(false)
		}
	}

	const submitCheckout = async ({ CardElement, customerEmail, input }: ConfirmPaymentPropsType) => {
		setLoading(true)

		openAlert({
			kind: "info",
			primary: "Processing payment.",
			secondary: "Sending payment request to Stripe...",
			timeout: 40000,
		})

		const cardElement = elements?.getElement(CardElement)

		if (!cardElement) {
			setLoading(false)
			return null
		}

		const paymentMethod: Omit<CreatePaymentMethodCardData, "type"> = {
			card: cardElement,
			billing_details: {
				email: customerEmail ?? undefined,
				address: { postal_code: input.billing?.postcode ?? undefined },
			},
		}

		if (!paymentMethod.card || !stripeData.clientSecret || !stripeData.paymentIntentId) {
			setLoading(false)
			return null
		}

		// use Stripe client secret to process card payment method
		const stripeResult = await stripe?.confirmCardPayment(stripeData.clientSecret, {
			payment_method: paymentMethod,
		})
		console.log("Stripe Result", stripeResult)

		if (stripeResult?.error) {
			openAlert({
				kind: "error",
				primary: "Error submitting payment to Stripe.",
				secondary: stripeResult.error.message,
				timeout: 3000,
			})
			setLoading(false)
		} else {
			// Handle various states of paymentStatus
			switch (stripeResult?.paymentIntent.status) {
				case "processing":
					// While for some payment methods (for example, cards) processing can be quick,
					// other types of payment methods can take up to a few days to process.

					openAlert({
						kind: "warning",
						primary: "Payment is processing.",
						secondary: "We'll create the order so it's ready as soon as the payment is complete.",
						timeout: 40000,
					})

					await createOrder({
						input,
						metadata: [
							{
								key: "_stripe_intent_id",
								value: stripeData.paymentIntentId,
							},
						],
					})

					break

				case "requires_action":
					// If the payment requires additional actions, such as authenticating with 3D Secure,
					// the PaymentIntent has a status of requires_action.

					openAlert({
						kind: "warning",
						primary: "Payment requires further authentication.",
						secondary: "We'll create the order so it's ready as soon as the payment is complete.",
						timeout: 40000,
					})

					await createOrder({
						input,
						metadata: [
							{
								key: "_stripe_intent_id",
								value: stripeData.paymentIntentId,
							},
						],
					})
					break
				case "succeeded":
					// A PaymentIntent with a status of succeeded means that the payment flow it is driving is complete.
					// The funds are now in your account and you can confidently fulfill the order.

					openAlert({
						kind: "info",
						primary: "Processing Order",
						secondary: "Payment processed. Finalizing order...",
						timeout: 40000,
					})

					// Update checkoutInput with stripe metadata and payment status
					const successCheckoutInput: CheckoutInput = {
						...input,
						isPaid: true,
					}

					await createOrder({
						input: successCheckoutInput,
						metadata: [
							{
								key: "_stripe_intent_id",
								value: stripeData.paymentIntentId,
							},
						],
					})

					break
				case "requires_payment_method":
					// If the payment attempt fails (for example due to a decline), the
					// PaymentIntent’s status returns to requires_payment_method.

					openAlert({
						kind: "error",
						primary: "Payment was not accepted.",
						secondary: "Please check the card info before trying again.",
						timeout: 3000,
					})

					setLoading(false)
				default:
					break
			}
		}
	}

	return { loading, setLoading, submitCheckout }
}

export default useCheckout
