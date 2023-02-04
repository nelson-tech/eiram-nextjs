"use client"

import { useState } from "react"
import Image from "next/image"
import Lightbox from "@components/Lightbox"

type LookbookGalleryPropsType = {
	images: string[]
}

const LookbookGallery = ({ images }: LookbookGalleryPropsType) => {
	const [open, setOpen] = useState(false)
	const [slide, setSlide] = useState<string>(images[0])

	const close = () => {
		setOpen(false)
	}

	return (
		<>
			<div className="columns-3xs gap-4 space-y-4 max-w-5xl mt-8 mx-auto">
				{images.map((imageUrl, i) => {
					if (imageUrl)
						return (
							<div
								key={imageUrl}
								onClick={() => {
									setSlide(imageUrl)
									setOpen(true)
								}}
								className={`w-full ${
									i % 2 == 0 ? "aspect-square" : "aspect-video"
								}  relative break-inside-avoid cursor-pointer`}
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
			</div>
			<Lightbox open={open} close={close} slide={slide} />
		</>
	)
}

export default LookbookGallery
