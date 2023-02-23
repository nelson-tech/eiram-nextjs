import type { GetMenuDataQuery, Menu } from "@api/codegen/graphql"
import getCachedQuery from "./getCachedQuery"

const getMenu = async () => {
  try {
    const { data } = await getCachedQuery<GetMenuDataQuery>("getMenuData")

    return data?.mainMenu as Menu | null | undefined
  } catch (error) {
    console.warn("Error in getMenu:", error)

    return null
  }
}

export default getMenu
