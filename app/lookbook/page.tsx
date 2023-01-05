import Image from "next/image"

import Link from "@components/Link"
import useAPI from "@lib/hooks/useAPI"
import { REST_WP } from "@lib/constants"

const getLookbooks = async () => {
	const { fetchAPI } = useAPI()

	const lookbooks: WP_LookbookType[] = await (
		await fetchAPI({ url: REST_WP + "/lookbooks" })
	).json()

	const look = await Promise.all(
		lookbooks.map(async (lookbook) => {
			const coverImage: WP_MediaType = await (
				await fetchAPI({ url: REST_WP + "/media/" + lookbook?.acf?.media?.coverImage })
			).json()

			return {
				...lookbook,
				coverImage: {
					alt: coverImage?.alt_text,
					url: coverImage?.source_url,
					title: coverImage?.title?.rendered,
				},
			}
		}),
	)

	return look
}

const LookbooksPage = async () => {
	const data = await getLookbooks()

	const lookbooks = data
	return (
		<div className="max-w-7xl m-auto p-8 mb-8">
			{lookbooks && (
				<>
					{" "}
					<div className="text-center">
						<h2 className="text-4xl font-bold uppercase text-gray-500 font-sans tracking-wide">
							Lookbook
						</h2>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-2 md:mx-8 lg:mx-16 mt-12">
						{lookbooks.map((lookbook) => {
							const image = lookbook.coverImage

							return (
								<div
									key={lookbook.id}
									className="relative mx-auto cursor-pointer group w-full rounded-sm "
									style={{ height: "600px" }}
									title={lookbook?.title.rendered}
								>
									<Link href={`/lookbook/${lookbook?.slug}`} className="absolute  w-full h-full">
										<Image
											src={image?.url}
											alt={image?.alt}
											fill
											sizes="(max-width: 800px) 100vw,33vw"
											className="absolute object-cover w-full h-full rounded-sm"
										/>
										<div className="absolute flex items-center w-full h-full bg-black bg-opacity-80 opacity-0 group-hover:opacity-80 transition-all rounded-sm overflow-hidden z-10">
											<div
												className="border border-white my-auto w-full mx-8 flex justify-center items-center"
												style={{ height: "550px" }}
											>
												<h2 className="text-white text-4xl text-center uppercase font-sans">
													{lookbook?.title.rendered}
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

export default LookbooksPage
