import useClient from "@api/client"
import { Collection, GetCollectionBySlugDocument } from "@api/codegen/graphql"

const getCollection = async (slug: string) => {
	const client = useClient()

	try {
		const collectionData = await client.request(GetCollectionBySlugDocument, { slug })

		return collectionData.collection as Collection
	} catch (error) {
		console.warn("Error fetching collection item", error)

		return null
	}
}

export default getCollection
