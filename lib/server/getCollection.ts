import useClient from "@api/client"
import { Collection, GetCollectionBySlugDocument } from "@api/codegen/graphql"

const getCollection = async (slug: string) => {
	const client = useClient()

	const collectionData = await client.request(GetCollectionBySlugDocument, { slug })

	return collectionData.collection as Collection
}

export default getCollection
