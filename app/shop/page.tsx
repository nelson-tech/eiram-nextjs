import ProductGrid from "@components/productGrid"
import { REST_CART } from "@lib/constants"

const getAllProducts = async () => {
	const url = REST_CART + "/products"
	const headers = { "content-type": "application/json" }

	const response = await fetch(url, {
		method: "GET",
		headers,
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
