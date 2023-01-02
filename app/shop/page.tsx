import { cookies as nextCookies } from "next/headers"

import ProductGrid from "@components/productGrid"
import useAPI from "@lib/hooks/useAPI"
import { REST_CART } from "@lib/constants"

const getAllProducts = async () => {
	const cookies = nextCookies()

	const { fetchAPI } = useAPI()

	const response = await fetchAPI({
		cookies,
		url: REST_CART + "/products",
	})

	const data: WC_ProductType[] = await response.json()

	return data
}

const ShopPage = async () => {
	const products = await getAllProducts()

	// TODO - Handle Error
	return products ? <ProductGrid products={products} /> : <>No products found</>
}

export default ShopPage
