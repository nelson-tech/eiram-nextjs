"use client"

import NextImage from "next/image"
import Modal from "@components/modal"
import { XMarkIcon } from "@heroicons/react/20/solid"

type LightboxPropsType = {
	open: boolean
	close: () => void
	slide: string | WP_PressType["_embedded"]["wp:featuredmedia"][0] | undefined
}

const Lightbox = ({ open, close, slide }: LightboxPropsType) => {
	const simpleImage = typeof slide === "string"

	const getSizes = () => {
		if (simpleImage || !slide) {
			return { modal: { width: "100vw", height: "100vh" } }
		} else {
			const width = slide.media_details.width
			const height = slide.media_details.height

			const image = {
				width,
				height,
			}

			if (typeof window != "undefined") {
				const screenSize = { width: window.innerWidth, height: window.innerHeight }
				const horizontalPadding = 30
				const verticalPadding = 16

				const wConstrained =
					screenSize.width - horizontalPadding < image.width * (screenSize.height / image.height)

				const vConstrained =
					screenSize.height < image.height * ((screenSize.width - verticalPadding) / image.width)

				const processedWidth = Math.min(
					screenSize.width - horizontalPadding,
					image.width * (screenSize.height / image.height) -
						(wConstrained
							? horizontalPadding
							: vConstrained && image.width > image.height
							? verticalPadding
							: 0),
				)

				const processedHeight = Math.min(
					screenSize.height,
					image.height * (screenSize.width / image.width) -
						(vConstrained
							? verticalPadding
							: wConstrained && image.height > image.width
							? horizontalPadding
							: 0),
				)

				image.width = processedWidth
				image.height = processedHeight

				const modal = { width: `${image.width}px`, height: `${image.height}px`, padding: "1rem" }

				return { image, modal }
			}

			const modal = { width: "100vw", height: "100vh" }

			return { image, modal }
		}
	}

	const sizes = getSizes()

	return slide ? (
		<Modal
			open={open}
			closeModal={close}
			panelStyle={"inline-block  overflow-hidden shadow-xl rounded-2xl"}
		>
			<>
				<div style={sizes.modal}>
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
						<NextImage
							src={slide.source_url}
							// loading="eager"
							// placeholder="blur"
							alt={slide.alt_text}
							width={sizes.image.width}
							height={sizes.image.height}
							className=" object-contain rounded-lg overflow-hidden"
							sizes={"100vw"}
						/>
					)}
				</div>
			</>
		</Modal>
	) : (
		<div />
	)
}

export default Lightbox
