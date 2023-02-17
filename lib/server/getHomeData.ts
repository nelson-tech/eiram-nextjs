import getClient from "@api/client"
import { GetBackgroundVideoDocument } from "@api/codegen/graphql"
import type { Page } from "@api/codegen/graphql"

const getHomeData = async () => {
	try {
		const client = getClient()

		const data = await client.request(GetBackgroundVideoDocument)

		return data?.page as Page | null | undefined
	} catch (error) {
		console.warn("Error in getHomeData:", error)

		return null
	}
}

export default getHomeData
