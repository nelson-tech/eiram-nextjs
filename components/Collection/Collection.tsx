import CollectionGallery from "./Gallery"

type CollectionInputType = {
	collection: WP_CollectionType
}

const Collection = ({ collection }: CollectionInputType) => {
	const images = collection?.acf?.media?.images
	return (
		<div className="p-8 mx-auto max-w-7xl text-center text-gray-600">
			<h2 className="text-4xl font-bold font-sans tracking-wide pb-8">
				{collection?.title?.rendered}
			</h2>

			{collection.content.rendered && (
				<div
					className="px-8 mx-8"
					dangerouslySetInnerHTML={{ __html: collection?.content?.rendered }}
				/>
			)}
			{images && <CollectionGallery images={images} />}
			{collection?.acf?.media?.video && (
				<div className="w-full rounded-md pt-8 relative">
					<video muted controls id="video" className="w-full rounded-md aspect-video">
						<source src={collection.acf.media.video} />
					</video>
				</div>
			)}
		</div>
	)
}

export default Collection
