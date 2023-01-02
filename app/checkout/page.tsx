import { STRIPE_ENDPOINT } from "@lib/constants"
import getTokens from "@lib/utils/getTokens"

import Checkout from "@components/checkout"

const getStripeData = async () => {
	const { tokens } = getTokens()

	const response = await fetch(STRIPE_ENDPOINT, {
		method: "POST",
		body: JSON.stringify({ tokens }),
	})
	const paymentIntentResponse: STRIPE_PaymentIntentType = await response.json()

	return paymentIntentResponse
}

const CheckoutPage = async () => {
	const stripeData = await getStripeData()

	return (
		<>
			<Checkout stripeData={stripeData} />
		</>
	)
}

export default CheckoutPage
