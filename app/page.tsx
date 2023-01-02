import type { WP_REST_API_Attachment } from "wp-types"

import isServer from "@lib/utils/isServer"
import { REST_WP } from "@lib/constants"

const getBackgroundVideo = async () => {
	const res = await fetch(REST_WP + "/pages?slug=home")

	const data = await res.json()

	const acf = data[0]?.acf

	const videoID = acf?.video
	const placeholderID = acf?.placeholderImage

	const videoData: WP_REST_API_Attachment =
		videoID && (await (await fetch(REST_WP + "/media/" + videoID)).json())
	const placeholderData: WP_REST_API_Attachment =
		placeholderID && (await (await fetch(REST_WP + "/media/" + placeholderID)).json())

	return { data, acf, videoData, placeholderData }
}

const HomePage = async () => {
	const { videoData, placeholderData } = await getBackgroundVideo()

	const windowScale = !isServer
		? window.screen.width / ((videoData?.media_details?.width as number) || 1)
		: 1

	const viewHeight = ((videoData?.media_details?.height as number) || 1) * windowScale

	return videoData?.source_url && videoData?.mime_type ? (
		<div
			id="video-container"
			className={` w-full h-screen -z-[2] -mb-8`}
			style={{
				backgroundImage: `url('${placeholderData?.source_url}')`,
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

export default HomePage
