import type { GetBackgroundVideoQuery, Page } from "@api/codegen/graphql"
import getCachedQuery from "./getCachedQuery"

const getHomeData = async () => {
  try {
    const { data } = await getCachedQuery<GetBackgroundVideoQuery>(
      "getBackgroundVideo"
    )

    return data?.page as Page | null | undefined
  } catch (error) {
    console.warn("Error in getHomeData:", error)

    return null
  }
}

export default getHomeData
