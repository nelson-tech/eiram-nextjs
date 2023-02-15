"use client"

import { useState } from "react"

import { MediaItem, PressItem } from "@api/codegen/graphql"

import Lightbox from "components/Lightbox"
import Image from "components/Image"

type PressGalleryPropsType = {
	press: PressItem[]
}

const PressGallery = ({ press }: PressGalleryPropsType) => {
	const [open, setOpen] = useState(true)
	const [slide, setSlide] = useState<MediaItem>()

	const close = () => {
		setOpen(false)
	}

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mt-8 mx-auto">
				{press.map((press, i) => {
					const image = press.featuredImage?.node

					return (
						<div
							key={press.id}
							onClick={() => {
								setSlide(image)
								setOpen(true)
							}}
							className="w-full aspect-[8.5/11] relative align-middle break-after-avoid break-inside-avoid group rounded-sm text-center cursor-pointer overflow-hidden"
						>
							{image?.sourceUrl && (
								<Image
									src={image.sourceUrl}
									alt={image.altText ?? ""}
									priority
									fill
									sizes="(max-width: 400px) 100vw,(max-width: 768px) 50vw,33vw"
									className=" object-cover align-middle rounded-sm"
								/>
							)}

							<div className="absolute flex items-center w-full h-full bg-black bg-opacity-80 opacity-0 group-hover:opacity-80 transition-all rounded-sm overflow-hidden z-10">
								<div className="w-full flex justify-center items-center">
									<h2 className="text-white text-xl text-center">
										{press.content && <div dangerouslySetInnerHTML={{ __html: press.content }} />}
									</h2>
								</div>
							</div>
						</div>
					)
				})}
			</div>

			<Lightbox open={open} close={close} slide={slide} />
		</>
	)
}

export default PressGallery
