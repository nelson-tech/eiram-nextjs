import { REST_WP } from "@lib/constants"

const getLookbook = async (slug: string) => {
	const url = REST_WP + "/lookbooks?slug=" + slug + "&acf_format=standard"
	const headers = { "content-type": "application/json" }

	const response: Response = await fetch(url, {
		method: "GET",
		headers,
	})

	const lookbookData: WP_LookbookType[] = await response?.json()

	const lookbook: WP_LookbookType | null =
		lookbookData && lookbookData.length > 0 ? lookbookData[0] : null

	return lookbook
}

export default getLookbook
