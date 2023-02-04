import { REST_WP } from "@lib/constants"

const getCollection = async (slug: string) => {
	const url = REST_WP + "/collections?slug=" + slug + "&acf_format=standard"
	const headers = { "content-type": "application/json" }

	const response: Response = await fetch(url, {
		method: "GET",
		headers,
	})

	const collectionData: WP_CollectionType[] = await response?.json()

	const collection: WP_CollectionType | null =
		collectionData && collectionData.length > 0 ? collectionData[0] : null

	return collection
}

export default getCollection
