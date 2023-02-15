"use client"

import { MediaItem } from "@api/codegen/graphql"
import isServer from "@lib/utils/isServer"
import { useEffect } from "react"

type BackgrountVideoInputType = {
	videoData: MediaItem
	placeholderData: MediaItem
}

const BackgroundVideo = ({ videoData, placeholderData }: BackgrountVideoInputType) => {
	const getClientSizes = () => {
		let viewHeight = videoData?.mediaDetails?.height

		let imageSizing = "width=1920"

		if (!isServer) {
			const windowScale = window.innerWidth / ((videoData?.mediaDetails?.width as number) || 1)

			viewHeight = ((videoData?.mediaDetails?.height as number) || 1) * windowScale

			imageSizing =
				window.innerWidth > window.innerHeight
					? `width=${window.innerWidth}`
					: `height=${window.innerHeight}`
		}

		return { imageSizing, viewHeight }
	}

	const { imageSizing, viewHeight } = getClientSizes()

	const bgImageURL = `${placeholderData?.sourceUrl}?format=webp&quality=80&${imageSizing}`

	return bgImageURL ? (
		<div
			id="video-container"
			className="w-full h-screen"
			style={{
				backgroundImage: `url('${bgImageURL}')`,
			}}
		>
			{videoData?.mediaItemUrl && videoData?.mimeType && (
				<video autoPlay loop muted id="video" className="w-full h-screen object-cover">
					<source src={videoData.mediaItemUrl} type={videoData.mimeType} />
				</video>
			)}
		</div>
	) : (
		<div style={{ height: `${viewHeight}px` }} />
	)
}

export default BackgroundVideo
