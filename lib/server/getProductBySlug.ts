import getClient from "@api/client"
import { GetProductDataBySlugDocument } from "@api/codegen/graphql"
import type { FullProduct } from "@lib/types/products"

const getProductBySlug = async (slug: string) => {
  try {
    const client = getClient()

    const data = await client.request(GetProductDataBySlugDocument, {
      id: slug,
    })

    return data?.product as FullProduct | null | undefined
  } catch (error) {
    console.warn("Error in getProductBySlug:", error)

    return null
  }
}

export default getProductBySlug
