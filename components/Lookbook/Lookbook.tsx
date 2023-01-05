import Image from "next/image"

type LookbookInputType = {
	lookbook: WP_LookbookType
}

const Lookbook = ({ lookbook }: LookbookInputType) => {
	return (
		<div className="p-8 mx-auto max-w-7xl text-center text-gray-600">
			<h2 className="text-4xl font-bold font-sans tracking-wide pb-8">
				{lookbook?.title?.rendered}
			</h2>

			{lookbook.content.rendered && (
				<div
					className="px-8 mx-8"
					dangerouslySetInnerHTML={{ __html: lookbook?.content?.rendered }}
				/>
			)}
			{lookbook?.acf?.media?.images && (
				<div className="columns-3xs gap-4 space-y-4 max-w-5xl mt-8 mx-auto">
					{lookbook.acf.media.images.map((imageUrl, i) => {
						if (imageUrl)
							return (
								<div
									key={imageUrl}
									className={`w-full ${
										i % 2 == 0 ? "aspect-square" : "aspect-video"
									}  relative break-inside-avoid`}
								>
									<Image
										src={imageUrl}
										alt={""}
										fill
										sizes="(max-width: 400px) 100vw,(max-width: 768px) 50vw,33vw"
										className=" object-cover rounded-sm"
									/>
								</div>
							)
					})}
					{/* {lookbook.images.length % 3 == 0 && (
        <div
          className={`w-full ${
            true ? "aspect-video" : "aspect-video"
          } overflow-hidden mb-4 rounded-sm relative`}
        >
          <Image
            src={lookbook.images[0]?.source_url}
            alt={lookbook.images[0]?.alt_text}
            fill
            sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
            className=" object-cover rounded-sm opacity-0"
          />
        </div>
      )} */}
				</div>
			)}
			{lookbook?.acf?.media?.video && (
				<div className="w-full rounded-md pt-8 relative">
					<video muted controls id="video" className="w-full rounded-md aspect-video">
						<source src={lookbook.acf.media.video} />
					</video>
				</div>
			)}
		</div>
	)
}

export default Lookbook
