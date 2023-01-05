import { FRONTEND_BASE } from "@lib/constants"
import getTokens from "@lib/utils/getTokens"

const getOrderById = async (id: string) => {
	const { tokens } = getTokens()

	const response = await fetch(FRONTEND_BASE + "/api/orders", {
		method: "POST",
		body: JSON.stringify({ tokens, orderId: id }),
	})

	const data: WC_Order = await response.json()

	return data
}

export default getOrderById
