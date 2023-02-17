import getClient from "@api/client"
import { GetMenuDataDocument } from "@api/codegen/graphql"
import type { Menu } from "@api/codegen/graphql"

const getMenu = async () => {
  try {
    const client = getClient()

    const data = await client.request(GetMenuDataDocument)

    return data.mainMenu as Menu | null | undefined
  } catch (error) {
    console.warn("Error in getMenu:", error)

    return null
  }
}

export default getMenu
