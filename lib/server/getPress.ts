import { REST_WP } from "@lib/constants"

const getPress = async () => {
	const url = REST_WP + "/press?_embed"
	// const headers = { "content-type": "application/json" }

	const response: Response = await fetch(url, {
		method: "GET",
		// headers,
	})

	const pressData: WP_PressType[] = await response?.json()

	return pressData
}

export default getPress
