import type { GetPressDataQuery, PressItem } from "@api/codegen/graphql"
import getCachedQuery from "./getCachedQuery"

const getPress = async () => {
  try {
    const { data } = await getCachedQuery<GetPressDataQuery>("getPressData")

    return data?.press?.nodes as PressItem[] | null | undefined
  } catch (error) {
    console.warn("Error in getPress:", error)

    return null
  }
}

export default getPress
