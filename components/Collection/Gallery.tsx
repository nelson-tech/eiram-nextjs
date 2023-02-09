"use client"

import { useState } from "react"
import Image from "next/image"
import Lightbox from "@components/Lightbox"
import { MediaItem } from "@api/codegen/graphql"

type LookbookGalleryPropsType = {
	images: MediaItem[]
}

const LookbookGallery = ({ images }: LookbookGalleryPropsType) => {
	const [open, setOpen] = useState(false)
	const [slide, setSlide] = useState<MediaItem>(images[0])

	const close = () => {
		setOpen(false)
	}

	return (
		<>
			<div className="columns-3xs gap-4 space-y-4 max-w-5xl mx-auto">
				{images.map((image, i) => {
					if (image)
						return (
							<div
								key={image.id}
								onClick={() => {
									setSlide(image)
									setOpen(true)
								}}
								className={`w-full ${
									i % 2 == 0 ? "aspect-square" : "aspect-video"
								}  relative align-middle break-inside-avoid rounded-sm text-center cursor-pointer overflow-hidden`}
							>
								<Image
									src={image.sourceUrl}
									alt={image.altText}
									fill
									sizes="(max-width: 400px) 100vw,(max-width: 768px) 50vw,33vw"
									className=" object-cover align-middle rounded-sm"
								/>
							</div>
						)
				})}
			</div>
			<Lightbox open={open} close={close} slide={slide} />
		</>
	)
}

export default LookbookGallery
