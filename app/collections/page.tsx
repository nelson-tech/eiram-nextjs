import Image from "next/image"

import Link from "@components/Link"
import { GetCollectionsDataQuery } from "@api/codegen/graphql"
import getCachedQuery from "@lib/server/getCachedQuery"

const CollectionsPage = async () => {
	const { data } = await getCachedQuery<GetCollectionsDataQuery>("getCollectionsData")

	const collections = data.collections.nodes

	return (
		<div className="max-w-7xl m-auto p-8 mb-8">
			{collections && collections.length > 0 && (
				<>
					{" "}
					<div className="text-center">
						<h2 className="text-4xl font-bold uppercase text-gray-500 font-sans tracking-wide">
							Collections
						</h2>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-2 md:mx-8 lg:mx-16 mt-12">
						{collections.map((collection) => {
							const coverImage = collection.gallery?.media?.coverimage

							return (
								<div
									key={collection.id}
									className="relative mx-auto cursor-pointer group w-full rounded-sm "
									style={{ height: "600px" }}
									title={collection?.title}
								>
									<Link
										href={`/collections/${collection?.slug}`}
										className="absolute  w-full h-full"
									>
										<Image
											src={coverImage.sourceUrl}
											alt={coverImage.altText}
											{...(coverImage.mediaDetails.width
												? {
														width: coverImage.mediaDetails.width,
														height: coverImage.mediaDetails.height,
												  }
												: { fill: true, sizes: "(max-width: 800px) 100vw,33vw" })}
											className="absolute object-cover w-full h-full rounded-sm"
										/>
										<div className="absolute flex items-center w-full h-full bg-black bg-opacity-80 opacity-0 group-hover:opacity-80 transition-all rounded-sm overflow-hidden z-10">
											<div
												className="border border-white my-auto w-full mx-8 flex justify-center items-center"
												style={{ height: "550px" }}
											>
												<h2 className="text-white text-4xl text-center uppercase font-sans">
													{collection?.title}
												</h2>
											</div>
										</div>
									</Link>
								</div>
							)
						})}
					</div>
				</>
			)}
		</div>
	)
}

export default CollectionsPage
