import { REST_WP } from "@lib/constants"

const getPageBySlug = async (slug: string) => {
	const url = REST_WP + "/pages?slug=" + slug

	const headers = { "content-type": "application/json" }

	const fetchArgs: RequestInit = {
		method: "GET",
		headers,
	}

	const response = await fetch(url, {
		...fetchArgs,
	})

	const data: WP_REST_API_Post[] = await response.json()

	return data && data.length > 0 ? data[0] : null
}

export default getPageBySlug
