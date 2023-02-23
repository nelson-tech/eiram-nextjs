import type { GetProductsDataQuery } from "@api/codegen/graphql"
import type { FullProduct } from "@lib/types/products"
import getCachedQuery from "./getCachedQuery"

const getProducts = async () => {
  try {
    const { data } = await getCachedQuery<GetProductsDataQuery>(
      "getProductsData"
    )

    return data?.products?.nodes as FullProduct[] | null | undefined
  } catch (error) {
    console.warn("Error in getProducts:", error)

    return null
  }
}

export default getProducts
