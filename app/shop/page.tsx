import useClient from "@api/client"
import { GetProductsWithCategoriesDocument, Product } from "@api/codegen/graphql"

import ProductGrid from "@components/productGrid"

const getAllProducts = async () => {
	const client = useClient()
	const productData = await client.request(GetProductsWithCategoriesDocument)

	return productData?.products?.nodes as Product[]
}

const ShopPage = async () => {
	const products = await getAllProducts()

	// TODO - Handle Error
	return products ? <ProductGrid products={products} /> : <>No products found</>
}

export default ShopPage
