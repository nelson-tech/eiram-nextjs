import type { WP_REST_API_Attachment } from "wp-types"

import { REST_WP } from "@lib/constants"
import BackgroundVideo from "@components/BackgroundVideo"

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

	return (
		<>
			<BackgroundVideo videoData={videoData} placeholderData={placeholderData} />
		</>
	)
}

export default HomePage
