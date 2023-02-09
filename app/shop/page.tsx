import { GetProductsDataQuery, Product } from "@api/codegen/graphql"

import ProductGrid from "@components/productGrid"
import getCachedQuery from "@lib/server/getCachedQuery"

const ShopPage = async () => {
	const { data } = await getCachedQuery<GetProductsDataQuery>("getProductsData")

	const products = data?.products?.nodes as Product[]

	// TODO - Handle Error
	return products ? <ProductGrid products={products} /> : <>No products found</>
}

export const revalidate = 60 // revalidate this page every 60 seconds

export default ShopPage
