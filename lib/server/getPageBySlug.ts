import { GetPageDataBySlugQuery } from "@api/codegen/graphql"
import getCachedQuery from "./getCachedQuery"

const getPageBySlug = async (slug: string) => {
	return await getCachedQuery<GetPageDataBySlugQuery>(
		`getPageDataBySlug&variables={"slug":"${slug}"}`,
	)
}

export default getPageBySlug
