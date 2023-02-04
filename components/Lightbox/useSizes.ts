import { useEffect, useState } from "react"

type UseSizesPropsType = {
	slide: string | WP_PressType["_embedded"]["wp:featuredmedia"][0] | undefined
}

const useSizes = ({ slide }: UseSizesPropsType) => {
	const [modalSize, setModalSize] = useState<{ [key: string]: string }>({
		width: "100vw",
		height: "100vh",
	})
	const [imageSize, setImageSize] = useState<{ width: number; height: number }>()

	useEffect(() => {
		if (slide && typeof slide !== "string") {
			console.log("Window", window.innerHeight, window.innerWidth)

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

				setImageSize({ width: processedWidth, height: processedHeight })

				setModalSize({
					width: `${processedWidth}px`,
					height: `${processedHeight}px`,
					padding: "1rem",
				})
			}
		}
	}, [slide, window.innerWidth, window.innerHeight])

	return { modalSize, imageSize }
}

export default useSizes
