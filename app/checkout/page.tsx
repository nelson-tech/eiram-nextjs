import useClient from "@api/client"
import { Customer, GetCustomerDataDocument } from "@api/codegen/graphql"
import { STRIPE_ENDPOINT } from "@lib/constants"
import getMenu from "@lib/server/getMenu"
import getTokensServer from "@lib/utils/getTokensServer"

import Checkout from "@components/checkout"

const getStripeData = async () => {
	const { tokens } = await getTokensServer()

	const response = await fetch(STRIPE_ENDPOINT, {
		method: "POST",
		body: JSON.stringify({ tokens }),
	})
	const paymentIntentResponse: STRIPE_PaymentIntentType = await response?.json()

	return paymentIntentResponse
}

const getCustomerData = async () => {
	const { tokens } = await getTokensServer()

	const client = useClient(tokens)

	const customerData = await client.request(GetCustomerDataDocument)

	return customerData.customer as Customer
}

const CheckoutPage = async () => {
	const stripePromise = getStripeData()
	const menuPromise = getMenu()
	const customerPromise = getCustomerData()

	const [stripeData, menuData, customerData] = await Promise.all([
		stripePromise,
		menuPromise,
		customerPromise,
	])

	const { colors } = menuData.mainMenu.siteSettings

	return (
		<>
			<Checkout stripeData={stripeData} colors={colors} customer={customerData} />
		</>
	)
}

export default CheckoutPage
