import useClient from "@api/client"
import { GetProductDataBySlugDocument } from "@api/codegen/graphql"

const getProductByID = async (slug: string) => {
	const client = useClient()

	if (slug !== "%5Bslug%5D") {
		const productData = await client.request(GetProductDataBySlugDocument, { id: slug })

		return productData.product
	}
}

export default getProductByID
