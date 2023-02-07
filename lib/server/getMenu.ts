import { GetMenuDataQuery } from "@api/codegen/graphql"
import getCachedQuery from "./getCachedQuery"

const getMenu = async () => {
	return getCachedQuery<GetMenuDataQuery>("getMenuData")
}

export default getMenu
