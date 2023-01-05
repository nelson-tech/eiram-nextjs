import { REST_CART } from "@lib/constants"

const getProductByID = async (sku: string) => {
	const url = REST_CART + "/products?sku=" + sku

	const headers = { "content-type": "application/json" }

	const response = await fetch(url, {
		method: "GET",
		headers,
	})

	const data: WC_ProductType[] = await response?.json()

	const product = data?.length > 0 ? data[0] : null

	return product
}

export default getProductByID
