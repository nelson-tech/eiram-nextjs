import { Collection } from "@api/codegen/graphql"
import CollectionGallery from "./Gallery"

type CollectionInputType = {
	collection: Collection
}

const Collection = ({ collection }: CollectionInputType) => {
	const images = collection?.gallery.media.images
	return (
		<div className="p-8 mx-auto max-w-7xl text-center text-gray-600">
			<h2 className="text-4xl font-bold tracking-wide pb-8">{collection?.title}</h2>

			{collection.content && (
				<div
					className="px-8 mx-8 wp-container"
					dangerouslySetInnerHTML={{ __html: collection?.content }}
				/>
			)}
			{images && <CollectionGallery images={images} />}
			{collection?.gallery?.media?.video && (
				<div className="w-full rounded-md relative">
					<video muted controls id="video" className="w-full rounded-md aspect-video">
						<source src={collection.gallery.media.video.mediaItemUrl} />
					</video>
				</div>
			)}
		</div>
	)
}

export default Collection
