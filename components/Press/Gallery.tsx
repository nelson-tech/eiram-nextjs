"use client"

import { useState } from "react"
import Image from "next/image"

import Link from "@components/Link"
import Lightbox from "@components/Lightbox"

type PressGalleryPropsType = {
	press: WP_PressType[]
}

const PressGallery = ({ press }: PressGalleryPropsType) => {
	const [open, setOpen] = useState(true)
	const [slide, setSlide] = useState<WP_PressType["_embedded"]["wp:featuredmedia"][0]>()

	const close = () => {
		setOpen(false)
	}

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-2 md:mx-8 lg:mx-16 mt-12">
				{press.map((press) => {
					const image = press._embedded["wp:featuredmedia"][0]

					return (
						<div
							key={press.id}
							onClick={() => {
								setSlide(image)
								setOpen(true)
							}}
							className=" mx-auto cursor-pointer group w-full rounded-sm "
							title={press?.title.rendered}
						>
							<div className=" relative" style={{ height: "600px" }}>
								<Image
									src={image.source_url}
									alt={image.alt_text}
									fill
									sizes="(max-width: 800px) 100vw,33vw"
									className=" object-contain w-full h-full rounded-sm"
								/>
							</div>
							{/* <div className="absolute flex items-center w-full h-full bg-black bg-opacity-80 opacity-0 group-hover:opacity-80 transition-all rounded-sm overflow-hidden z-10">
								<div
									className="my-auto w-full flex justify-center items-center"
									style={{ height: "550px" }}
								>
									<h2 className="text-white text-4xl text-center uppercase font-sans">
										<div dangerouslySetInnerHTML={{ __html: press.content.rendered }} />
									</h2>
								</div>
							</div> */}
							<div
								dangerouslySetInnerHTML={{ __html: press.content.rendered }}
								className="text-gray-600 text-center pt-4 pb-8"
							/>
						</div>
					)
				})}
			</div>

			<Lightbox open={open} close={close} slide={slide} />
		</>
	)
}

export default PressGallery
