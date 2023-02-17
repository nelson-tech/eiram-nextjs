import getClient from "@api/client"
import { GetProductsDataDocument } from "@api/codegen/graphql"
import type { FullProduct } from "@lib/types/products"

const getProducts = async () => {
  try {
    const client = getClient()

    const data = await client.request(GetProductsDataDocument)

    return data.products?.nodes as FullProduct[] | null | undefined
  } catch (error) {
    console.warn("Error in getProducts:", error)

    return null
  }
}

export default getProducts
