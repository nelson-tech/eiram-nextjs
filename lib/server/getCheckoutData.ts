import getClient from "@api/client"
import {
  Customer,
  GetCustomerDataWithAddressesDocument,
} from "@api/codegen/graphql"
import { STRIPE_ENDPOINT } from "@lib/constants"
import getTokensServer from "@lib/utils/getTokensServer"

const getCheckoutData = async () => {
  try {
    const { tokens } = await getTokensServer()

    const client = getClient(tokens)

    const stripeResponse = await fetch(STRIPE_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({ tokens }),
    })

    const stripeData: STRIPE_PaymentIntentType | null | undefined =
      await stripeResponse.json()

    const customerData = await client.request(
      GetCustomerDataWithAddressesDocument
    )

    return {
      stripeData,
      customer: customerData.customer as Customer | null | undefined,
    }
  } catch (error) {
    console.warn("Error in getCheckoutData:", error)

    return null
  }
}

export default getCheckoutData
