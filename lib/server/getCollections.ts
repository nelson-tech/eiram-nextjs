import type { GetCollectionsDataQuery, Collection } from "@api/codegen/graphql"
import getCachedQuery from "./getCachedQuery"

const getCollections = async () => {
  try {
    const { data } = await getCachedQuery<GetCollectionsDataQuery>(
      "getCollectionsData"
    )

    return data?.collections?.nodes as Collection[] | null | undefined
  } catch (error) {
    console.warn("Error in getHomeData:", error)

    return null
  }
}

export default getCollections
