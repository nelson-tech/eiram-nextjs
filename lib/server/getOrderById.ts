import getClient from "@api/client"
import { GetOrderDataByIdDocument } from "@api/codegen/graphql"
import getTokensServer from "@lib/utils/getTokensServer"

const getOrderById = async (id: string) => {
	const { tokens } = await getTokensServer()

	const client = getClient(tokens)

	const orderData = await client.request(GetOrderDataByIdDocument, { id })

	return orderData.order
}

export default getOrderById
