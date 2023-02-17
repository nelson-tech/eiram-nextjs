import getClient from "@api/client"
import { GetPageDataBySlugDocument } from "@api/codegen/graphql"
import type { Page } from "@api/codegen/graphql"

const getPageBySlug = async (slug: string) => {
	try {
		const client = getClient()

		const data = await client.request(GetPageDataBySlugDocument, { slug })

		return data.page as Page | null | undefined
	} catch (error) {
		console.warn("Error in getPageBySlug:", error)

		return null
	}
}

export default getPageBySlug
