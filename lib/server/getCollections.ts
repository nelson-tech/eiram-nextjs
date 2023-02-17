import getClient from "@api/client"
import { GetCollectionsDataDocument } from "@api/codegen/graphql"
import type { Collection } from "@api/codegen/graphql"

const getCollections = async () => {
	try {
		const client = getClient()

		const data = await client.request(GetCollectionsDataDocument)

		return data?.collections?.nodes as Collection[] | null | undefined
	} catch (error) {
		console.warn("Error in getHomeData:", error)

		return null
	}
}

export default getCollections
