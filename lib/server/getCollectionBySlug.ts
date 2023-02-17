import getClient from "@api/client"
import { GetCollectionBySlugDocument } from "@api/codegen/graphql"
import type { Collection } from "@api/codegen/graphql"

const getCollectionBySlug = async (slug: string) => {
	try {
		const client = getClient()

		const data = await client.request(GetCollectionBySlugDocument, { slug })

		return data?.collection as Collection | null | undefined
	} catch (error) {
		console.warn("Error in getCollectionBySlug:", error)

		return null
	}
}

export default getCollectionBySlug
