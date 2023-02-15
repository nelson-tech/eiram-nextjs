import { Collection, GetCollectionBySlugQuery } from "@api/codegen/graphql"
import getCachedQuery from "./getCachedQuery"

const getCollectionBySlug = async (slug: string) => {
	try {
		const { data } = await getCachedQuery<GetCollectionBySlugQuery>(
			`getCollectionDataBySlug&variables={"slug":"${slug}"}`,
		)

		return data?.collection as Collection | null | undefined
	} catch (error) {
		console.warn("Error in getCollectionBySlug:", error)
		return null
	}
}

export default getCollectionBySlug
