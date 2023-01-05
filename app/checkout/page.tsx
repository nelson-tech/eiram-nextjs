import { STRIPE_ENDPOINT } from "@lib/constants"
import getTokens from "@lib/utils/getTokens"
import getMenu from "@lib/server/getMenu"

import Checkout from "@components/checkout"

const getStripeData = async () => {
	const { tokens } = getTokens()

	const response = await fetch(STRIPE_ENDPOINT, {
		method: "POST",
		body: JSON.stringify({ tokens }),
	})
	const paymentIntentResponse: STRIPE_PaymentIntentType = await response?.json()

	return paymentIntentResponse
}

const CheckoutPage = async () => {
	const stripePromise = getStripeData()
	const menuPromise = getMenu()

	const [stripeData, menuData] = await Promise.all([stripePromise, menuPromise])

	const { colors } = menuData

	return (
		<>
			<Checkout stripeData={stripeData} colors={colors} />
		</>
	)
}

export default CheckoutPage
