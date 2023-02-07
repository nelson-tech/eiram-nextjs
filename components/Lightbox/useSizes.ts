import { useEffect, useState } from "react"

import { MediaItem } from "@api/codegen/graphql"
import isServer from "@lib/utils/isServer"

type UseSizesPropsType = {
	slide: string | MediaItem | undefined
}

const useSizes = ({ slide }: UseSizesPropsType) => {
	const [modalSize, setModalSize] = useState<{ [key: string]: string }>({
		width: "100vw",
		height: "100vh",
	})
	const [imageSize, setImageSize] = useState<{ width: number; height: number }>()

	useEffect(() => {
		if (slide && typeof slide !== "string") {
			const width = slide.mediaDetails.width
			const height = slide.mediaDetails.height

			const image = {
				width,
				height,
			}

			if (!isServer) {
				const screenSize = { width: window.innerWidth, height: window.innerHeight }
				const horizontalPadding = 30
				const verticalPadding = 16

				const wConstrained =
					screenSize.width - horizontalPadding < image.width * (screenSize.height / image.height)

				const vConstrained =
					screenSize.height < image.height * ((screenSize.width - verticalPadding) / image.width)

				const processedWidth = image.width
					? Math.min(
							screenSize.width - horizontalPadding,
							image.width * (screenSize.height / image.height) -
								(wConstrained
									? horizontalPadding
									: vConstrained && image.width > image.height
									? verticalPadding
									: 0),
					  )
					: screenSize.width - horizontalPadding

				const processedHeight = image.height
					? Math.min(
							screenSize.height,
							image.height * (screenSize.width / image.width) -
								(vConstrained
									? verticalPadding
									: wConstrained && image.height > image.width
									? horizontalPadding
									: 0),
					  )
					: screenSize.height

				setImageSize({ width: processedWidth, height: processedHeight })

				setModalSize({
					width: `${processedWidth}px`,
					height: `${processedHeight}px`,
					padding: "1rem",
				})
			}
		}
	}, [slide])

	return { modalSize, imageSize }
}

export default useSizes
