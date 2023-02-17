import getClient from "@api/client"
import { GetOrderDataByIdDocument } from "@api/codegen/graphql"
import type { Order } from "@api/codegen/graphql"
import getTokensServer from "@lib/utils/getTokensServer"

const getOrderById = async (id: string) => {
	try {
		const { tokens } = await getTokensServer()

		const client = getClient(tokens)

		const orderData = await client.request(GetOrderDataByIdDocument, { id })

		return orderData.order as Order | null | undefined
	} catch (error) {
		console.warn("Error in getOrderById:", error)

		return null
	}
}

export default getOrderById
