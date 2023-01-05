import getProductByID from "@lib/server/getProductById"

import DefaultTags from "../../DefaultTags"

const Head = async ({ params }: { params: { sku: string } }) => {
	const product = await getProductByID(params.sku)

	return (
		<>
			<DefaultTags />
			<title>{`${product.name} - Eiram Knitwear`}</title>
			<meta name="description" content={product.description} />
		</>
	)
}

export default Head
