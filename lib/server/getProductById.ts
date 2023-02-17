import getClient from "@api/client"
import { GetProductDataBySlugDocument } from "@api/codegen/graphql"
import type { FullProduct } from "@lib/types/products"

const getProductByID = async (slug: string) => {
  try {
    const client = getClient()

    const data = await client.request(GetProductDataBySlugDocument, {
      id: slug,
    })

    return data.product as FullProduct[]
  } catch (error) {
    console.warn("Error in getProductByID: ", error)

    return null
  }
}

export default getProductByID
