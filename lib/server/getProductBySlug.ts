import {
	GetProductDataBySlugQuery,
	Product,
	SimpleProduct,
	VariableProduct,
} from "@api/codegen/graphql"
import getCachedQuery from "./getCachedQuery"

const getProductBySlug = async (slug: string) => {
	const { data } = await getCachedQuery<GetProductDataBySlugQuery>(
		`getProductDataBySlug&variables={"id":"${slug}"}`,
	)

	return data?.product as Product & SimpleProduct & VariableProduct
}

export default getProductBySlug
