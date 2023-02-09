import getClient from "@api/client"
import { GetProductDataBySlugDocument } from "@api/codegen/graphql"

const getProductByID = async (slug: string) => {
	const client = getClient()

	try {
		const productData = await client.request(GetProductDataBySlugDocument, { id: slug })

		return productData.product
	} catch (error) {
		console.warn(error)
		return null
	}
}

export default getProductByID
