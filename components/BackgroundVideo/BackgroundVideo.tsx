"use client"

import { WP_REST_API_Attachment } from "wp-types"

type BackgrountVideoInputType = {
	videoData: WP_REST_API_Attachment
	placeholderData: WP_REST_API_Attachment
}

const BackgroundVideo = ({ videoData, placeholderData }: BackgrountVideoInputType) => {
	const windowScale = window.innerWidth / ((videoData?.media_details?.width as number) || 1)

	const viewHeight = ((videoData?.media_details?.height as number) || 1) * windowScale

	const imageSizing =
		window.innerWidth > window.innerHeight
			? `width=${window.innerWidth}`
			: `height=${window.innerHeight}`

	const bgImageURL = `${placeholderData?.source_url}?format=webp&quality=80&${imageSizing}`

	console.log("BG IMAGE", bgImageURL, window)

	return videoData?.source_url && videoData?.mime_type ? (
		<div
			id="video-container"
			className={` w-full h-screen -z-[2] -mb-8`}
			style={{
				backgroundImage: `url('${bgImageURL}')`,
			}}
		>
			<video
				autoPlay
				loop
				muted
				id="video"
				className="w-full h-screen object-cover -z-[1] opacity-100"
			>
				<source src={videoData.source_url} type={videoData.mime_type as string} />
			</video>
		</div>
	) : (
		<div style={{ height: `${viewHeight}px` }} />
	)
}

export default BackgroundVideo
