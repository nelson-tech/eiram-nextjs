"use client"

import isServer from "@lib/utils/isServer"
import { WP_REST_API_Attachment } from "wp-types"

type BackgrountVideoInputType = {
	videoData: WP_ImageArrayType
	placeholderData: WP_ImageArrayType
}

const BackgroundVideo = ({ videoData, placeholderData }: BackgrountVideoInputType) => {
	const getClientSizes = () => {
		let viewHeight = videoData?.height

		let imageSizing = "width=1920"

		if (!isServer) {
			const windowScale = window.innerWidth / ((videoData?.width as number) || 1)

			viewHeight = ((videoData?.height as number) || 1) * windowScale

			imageSizing =
				window.innerWidth > window.innerHeight
					? `width=${window.innerWidth}`
					: `height=${window.innerHeight}`
		}

		return { imageSizing, viewHeight }
	}

	const { imageSizing, viewHeight } = getClientSizes()

	const bgImageURL = `${placeholderData?.url}?format=webp&quality=80&${imageSizing}`

	return bgImageURL ? (
		<div
			id="video-container"
			className={` w-full h-screen -z-[2] -mb-8`}
			style={{
				backgroundImage: `url('${bgImageURL}')`,
			}}
		>
			{videoData?.url && videoData?.mime_type && (
				<video
					autoPlay
					loop
					muted
					id="video"
					className="w-full h-screen object-cover -z-[1] opacity-100 hidden sm:block"
				>
					<source src={videoData.url} type={videoData.mime_type} />
				</video>
			)}
		</div>
	) : (
		<div style={{ height: `${viewHeight}px` }} />
	)
}

export default BackgroundVideo
