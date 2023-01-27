"use client"

import NextImage from "next/image"
import Modal from "@components/modal"
import { XMarkIcon } from "@heroicons/react/20/solid"
import useSizes from "./useSizes"

type LightboxPropsType = {
	open: boolean
	close: () => void
	slide: string | WP_PressType["_embedded"]["wp:featuredmedia"][0] | undefined
}

const Lightbox = ({ open, close, slide }: LightboxPropsType) => {
	const simpleImage = typeof slide === "string"

	const { modalSize, imageSize } = useSizes({ slide })

	console.log("Image Size", imageSize, modalSize)

	return slide ? (
		<Modal
			open={open}
			closeModal={close}
			panelStyle={"inline-block  overflow-hidden shadow-xl rounded-2xl"}
		>
			<>
				<div style={modalSize}>
					<div
						onClick={close}
						className={`absolute ${
							simpleImage ? "right-4" : "right-4"
						} opacity-80 bg-gray-500 rounded-md m-4 z-50 cursor-pointer hover:bg-white text-white hover:text-black`}
					>
						<XMarkIcon className="h-8 w-8" />
					</div>
					{simpleImage ? (
						<NextImage
							fill
							src={slide}
							// loading="eager"
							// placeholder="blur"
							alt={""}
							className=" object-contain rounded-lg overflow-hidden"
							sizes={"100vw"}
						/>
					) : (
						imageSize && (
							<NextImage
								src={slide.source_url}
								// loading="eager"
								// placeholder="blur"
								alt={slide.alt_text}
								width={imageSize.width}
								height={imageSize.height}
								className=" object-contain rounded-lg overflow-hidden"
								sizes={"100vw"}
							/>
						)
					)}
				</div>
			</>
		</Modal>
	) : (
		<div />
	)
}

export default Lightbox
