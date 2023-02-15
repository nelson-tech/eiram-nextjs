import getClient from "@api/client"
import { GetOrderDataByIdDocument, Order } from "@api/codegen/graphql"
import getTokensServer from "@lib/utils/getTokensServer"

const getOrderById = async (id: string) => {
	const { tokens } = await getTokensServer()

	const client = getClient(tokens)

	const orderData = await client.request(GetOrderDataByIdDocument, { id })

	return orderData.order as Order | null | undefined
}

export default getOrderById
