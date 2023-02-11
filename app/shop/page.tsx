import { GetProductsDataQuery, Product } from "@api/codegen/graphql"
import getCachedQuery from "@lib/server/getCachedQuery"

import ProductGrid from "component/productGrid"

const ShopPage = async () => {
	const { data } = await getCachedQuery<GetProductsDataQuery>("getProductsData")

	const products = data?.products?.nodes as Product[]

	// TODO - Handle Error
	return (
		<div className="max-w-7xl m-auto p-8 mb-8">
			<div className="text-center pb-8">
				<h2 className="text-4xl font-bold text-gray-900 tracking-wide">Shop</h2>
				<h2 id="shop-heading" className="sr-only">
					Shop
				</h2>
			</div>

			{products ? <ProductGrid products={products} /> : <>No products found</>}
		</div>
	)
}

export default ShopPage

export const revalidate = 60 // revalidate this page every 60 seconds

export const metadata = {
	title: "Shop",
	description: "Browse our collection of knitted sweater, joggers, handbags, scarves, and more!",
	keywords: ["Shop", "Eiram", "Knitwear", "Wool", "Fashion", "Shopping"],
}
