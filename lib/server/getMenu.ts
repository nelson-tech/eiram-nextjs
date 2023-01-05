import { REST_MENU } from "@lib/constants"

const getMenu = async () => {
	try {
		const url = REST_MENU + "/menus/main"

		const response = await fetch(url)

		const data: WP_MENU = await response?.json()

		const colors = data?.acf?.colors ?? null
		const menuItems = data?.items ?? null
		const socialMedia = data?.acf?.footer?.socialMedia ?? null

		return { colors, menuItems, socialMedia }
	} catch (error) {
		console.warn("Error fetching menu", error)

		return null
	}
}

export default getMenu
