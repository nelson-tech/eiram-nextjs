import Image from "next/image"

import { REST_WP } from "@lib/constants"

import Link from "@components/Link"

const getLookbooks = async () => {
	const url = REST_WP + "/lookbooks?acf_format=standard"

	const headers = { "content-type": "application/json" }

	const response: Response = await fetch(url, {
		method: "GET",
		headers,
	})

	const lookbooksData: WP_LookbookType[] = await response?.json()

	return lookbooksData && lookbooksData.length > 0 ? lookbooksData : null
}

const LookbooksPage = async () => {
	const lookbooks = await getLookbooks()

	return (
		<div className="max-w-7xl m-auto p-8 mb-8">
			{lookbooks && lookbooks.length > 0 && (
				<>
					{" "}
					<div className="text-center">
						<h2 className="text-4xl font-bold uppercase text-gray-500 font-sans tracking-wide">
							Lookbook
						</h2>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-2 md:mx-8 lg:mx-16 mt-12">
						{lookbooks.map((lookbook) => {
							const imageUrl = lookbook.acf.media.coverImage

							return (
								<div
									key={lookbook.id}
									className="relative mx-auto cursor-pointer group w-full rounded-sm "
									style={{ height: "600px" }}
									title={lookbook?.title.rendered}
								>
									<Link href={`/lookbook/${lookbook?.slug}`} className="absolute  w-full h-full">
										<Image
											src={imageUrl}
											alt={""}
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
