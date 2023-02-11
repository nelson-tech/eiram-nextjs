import { Collection, GetCollectionBySlugQuery } from "@api/codegen/graphql"
import getCachedQuery from "./getCachedQuery"

const getCollectionBySlug = async (slug: string) => {
	const { data } = await getCachedQuery<GetCollectionBySlugQuery>(
		`getCollectionDataBySlug&variables={"slug":"${slug}"}`,
	)

	return data?.collection as Collection
}

export default getCollectionBySlug
