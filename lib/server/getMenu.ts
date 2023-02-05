import { GetMenusQuery } from "@api/codegen/graphql"
import { API_URL } from "@lib/constants"

const getMenu = async () => {
	const menuResponse = await fetch(API_URL + "?queryId=getMenuData", {
		headers: { "content-type": "application/json" },
	})
	const { data } = await menuResponse.json()

	return data as GetMenusQuery
}

export default getMenu
