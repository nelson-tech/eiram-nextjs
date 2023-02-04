import getCollection from "@lib/server/getCollection"

import Collection from "@components/Collection"

const CollectionPage = async ({ params }: { params: { slug: string } }) => {
	const collection = await getCollection(params.slug)

	return collection ? <Collection collection={collection} /> : <></>
}

export default CollectionPage
