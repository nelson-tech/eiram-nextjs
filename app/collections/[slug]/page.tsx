import getCollection from "@lib/server/getCollection"

import Collection from "@components/Collection"
import getCachedQuery from "@lib/server/getCachedQuery"
import { GetCollectionsDataQuery } from "@api/codegen/graphql"

const CollectionPage = async ({ params }: { params: { slug: string } }) => {
	const collection = await getCollection(params.slug)

	return collection ? (
		<Collection collection={collection} />
	) : (
		<>
			<div />
		</>
	)
}

export const revalidate = 60 // revalidate this page every 60 seconds

export async function generateStaticParams() {
	const { data } = await getCachedQuery<GetCollectionsDataQuery>("getCollectionsData")

	return data?.collections?.nodes?.map((collection) => ({
		slug: collection.slug,
	}))
}

export default CollectionPage
