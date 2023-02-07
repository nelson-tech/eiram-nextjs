import {
	GetProductDataBySlugQuery,
	Product,
	SimpleProduct,
	VariableProduct,
} from "@api/codegen/graphql"

import ProductDetails from "@components/productDetails"
import getCachedQuery from "@lib/server/getCachedQuery"

const ProductPage = async ({ params }: { params: { slug: string } }) => {
	const { data } = await getCachedQuery<GetProductDataBySlugQuery>(
		`getProductDataBySlug&variables={"id":"${params.slug}"}`,
	)

	const product = data?.product as Product & SimpleProduct & VariableProduct

	return (
		<main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
			{product?.id && <ProductDetails product={product} />}
		</main>
	)
}

export default ProductPage
