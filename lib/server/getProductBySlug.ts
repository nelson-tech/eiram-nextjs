import type { GetProductDataBySlugQuery } from "@api/codegen/graphql"
import type { FullProduct } from "@lib/types/products"
import getCachedQuery from "./getCachedQuery"

const getProductBySlug = async (slug: string) => {
  try {
    const { data } = await getCachedQuery<GetProductDataBySlugQuery>(
      `getProductDataBySlug&variables={"slug":"${slug}"}`
    )

    return data?.product as FullProduct | null | undefined
  } catch (error) {
    console.warn("Error in getProductBySlug:", error)

    return null
  }
}

export default getProductBySlug
