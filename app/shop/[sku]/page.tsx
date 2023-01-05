import getProductByID from "@lib/server/getProductById"

import ProductDetails from "@components/productDetails"

const ProductPage = async ({ params }: { params: { sku: string } }) => {
	const product = await getProductByID(params.sku)

	return (
		<main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
			{product?.id && <ProductDetails product={product} />}
		</main>
	)
}

export default ProductPage
