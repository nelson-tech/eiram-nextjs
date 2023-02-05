import useClient from "@api/client"
import { GetOrderDataByIdDocument } from "@api/codegen/graphql"
import getTokensServer from "@lib/utils/getTokensServer"

const getOrderById = async (id: string) => {
	const { tokens } = await getTokensServer()

	const client = useClient(tokens)

	const orderData = await client.request(GetOrderDataByIdDocument, { id })

	return orderData.order
}

export default getOrderById
