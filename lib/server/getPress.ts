import useClient from "@api/client"
import { GetPressDocument, PressItem } from "@api/codegen/graphql"

const getPress = async () => {
	const client = useClient()
	const pressData = await client.request(GetPressDocument)

	return pressData.press.nodes as PressItem[]
}

export default getPress
