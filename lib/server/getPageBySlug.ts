import useClient from "@api/client"
import { GetPageBySlugDocument } from "@api/codegen/graphql"

const getPageBySlug = async (slug: string) => {
	const client = useClient()
	const pageData = await client.request(GetPageBySlugDocument, { slug })

	return pageData.page
}

export default getPageBySlug
