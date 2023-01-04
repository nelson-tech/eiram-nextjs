import { STRIPE_ENDPOINT } from "@lib/constants"
import getTokens from "@lib/utils/getTokens"

import Checkout from "@components/checkout"
import useAPI from "@lib/hooks/useAPI"

const getMainMenu = async () => {
	const { fetchMenu } = useAPI()

	const data: WP_MENU = await (await fetchMenu())?.json()

	const colors = data?.acf?.colors ?? null
	const menuItems = data?.items ?? null
	const socialMedia = data?.acf?.footer?.socialMedia ?? null

	return { colors, menuItems, socialMedia }
}

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
	const stripePromise = getStripeData()
	const menuPromise = getMainMenu()

	const [stripeData, menuData] = await Promise.all([stripePromise, menuPromise])

	const { colors } = menuData

	return (
		<>
			<Checkout stripeData={stripeData} colors={colors} />
		</>
	)
}

export default CheckoutPage
