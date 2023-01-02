import { cookies as nextCookies } from "next/headers"

import ProductDetails from "@components/productDetails"
import useAPI from "@lib/hooks/useAPI"
import { REST_CART } from "@lib/constants"

const getProductByID = async (sku: string) => {
	const cookies = nextCookies()

	const { fetchAPI } = useAPI()

	const response = await fetchAPI({
		cookies,
		url: REST_CART + "/products?sku=" + sku,
	})

	const data: WC_ProductType[] = await response?.json()

	const product = data?.length > 0 ? data[0] : null

	return product
}

const ProductPage = async ({ params }: { params: { sku: string } }) => {
	const product = await getProductByID(params.sku)

	return (
		<main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
			{product?.id && <ProductDetails product={product} />}
		</main>
	)
}

export default ProductPage
