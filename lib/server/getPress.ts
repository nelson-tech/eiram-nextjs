import { GetPressDataQuery, PressItem } from "@api/codegen/graphql"
import getCachedQuery from "./getCachedQuery"

const getPress = async () => {
	const { data } = await getCachedQuery<GetPressDataQuery>("getPressData")
	return data?.press?.nodes as PressItem[] | null | undefined
}

export default getPress
