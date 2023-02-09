import getClient from "@api/client"
import { Customer, GetCustomerDataWithAddressesDocument } from "@api/codegen/graphql"
import { STRIPE_ENDPOINT } from "@lib/constants"
import getTokensServer from "@lib/utils/getTokensServer"

const getCheckoutData = async () => {
	const { tokens } = await getTokensServer()

	const client = getClient(tokens)

	const stripeResponse = await fetch(STRIPE_ENDPOINT, {
		method: "POST",
		body: JSON.stringify({ tokens }),
	})

	const stripeData: STRIPE_PaymentIntentType = await stripeResponse.json()

	const customerData = await client.request(GetCustomerDataWithAddressesDocument)

	return { stripeData, customer: customerData.customer as Customer }
}

export default getCheckoutData
