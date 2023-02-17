import getClient from "@api/client"
import { GetProductsSlugDocument } from "@api/codegen/graphql"
import type { RankMathProductTypeSeo } from "@api/codegen/graphql"
import getProductBySlug from "@lib/server/getProductBySlug"
import parseMetaData from "@lib/utils/parseMetaData"

import ProductDetails from "components/ProductDetails"

type ProductPageParamsType = { params: { slug: string } }

const ProductPage = async ({ params }: ProductPageParamsType) => {
	const product = await getProductBySlug(params.slug)

	return (
		<main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
			{product?.id && <ProductDetails product={product} />}
		</main>
	)
}

export default ProductPage

export const revalidate = 60 // revalidate this page every 60 seconds

export async function generateStaticParams() {
	const client = getClient()

	const data = await client.request(GetProductsSlugDocument)

	return (
		data?.products?.nodes?.map((product) => ({
			slug: product.slug,
		})) ?? []
	)
}

// @ts-ignore
export async function generateMetadata({ params }: ProductPageParamsType) {
	const product = await getProductBySlug(params?.slug)

	const metaData = parseMetaData(
		product?.seo as RankMathProductTypeSeo,
		product?.title ? product.title : undefined,
	)

	return metaData
}
