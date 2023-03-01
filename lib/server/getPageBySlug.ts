import type { GetPageDataBySlugQuery, Page } from "@api/codegen/graphql"
import getCachedQuery from "./getCachedQuery"

const getPageBySlug = async (slug: string) => {
  try {
    const { data } = await getCachedQuery<GetPageDataBySlugQuery>(
      `getPageDataBySlug&variables={"slug":"${slug}"}`
    )

    return data?.page as Page | null | undefined
  } catch (error) {
    console.warn("Error in getPageBySlug:", error)

    return null
  }
}

export default getPageBySlug
