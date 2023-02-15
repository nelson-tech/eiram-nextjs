import { Collection, GetCollectionsDataQuery } from "@api/codegen/graphql"
import getCachedQuery from "./getCachedQuery"

const getCollections = async () => {
	const { data } = await getCachedQuery<GetCollectionsDataQuery>("getCollectionsData")

	return data?.collections?.nodes as Collection[] | null | undefined
}

export default getCollections
