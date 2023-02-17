import getClient from "@api/client"
import { GetPressDataDocument } from "@api/codegen/graphql"
import type { PressItem } from "@api/codegen/graphql"

const getPress = async () => {
	try {
		const client = getClient()

		const data = await client.request(GetPressDataDocument)

		return data?.press?.nodes as PressItem[] | null | undefined
	} catch (error) {
		console.warn("Error in getPress:", error)

		return null
	}
}

export default getPress
