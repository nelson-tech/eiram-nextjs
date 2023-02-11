import { GetBackgroundVideoQuery, Page } from "@api/codegen/graphql"
import getCachedQuery from "./getCachedQuery"

const getHomeData = async () => {
	const { data } = await getCachedQuery<GetBackgroundVideoQuery>("getBackgroundVideo")

	return data?.page as Page
}

export default getHomeData
