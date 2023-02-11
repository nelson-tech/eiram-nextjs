import { RankMathPostTypeSeo } from "@api/codegen/graphql"
import getCollectionBySlug from "@lib/server/getCollectionBySlug"
import getCollections from "@lib/server/getCollections"
import parseMetaData from "@lib/utils/parseMetaData"

import Collection from "@components/Collection"

const CollectionPage = async ({ params }: { params: { slug: string } }) => {
	const collection = await getCollectionBySlug(params.slug)

	return collection ? (
		<Collection collection={collection} />
	) : (
		<>
			<div />
		</>
	)
}

export default CollectionPage

export const revalidate = 60 // revalidate this page every 60 seconds

export async function generateStaticParams() {
	const collections = await getCollections()

	return collections?.map((collection) => ({
		slug: collection.slug,
	}))
}

// @ts-ignore
export async function generateMetadata({ params }) {
	const collection = await getCollectionBySlug(params.slug)

	const metaData = parseMetaData(collection?.seo as RankMathPostTypeSeo, collection?.title)

	return metaData
}
