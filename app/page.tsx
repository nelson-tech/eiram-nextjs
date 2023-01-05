import { REST_WP } from "@lib/constants"
import BackgroundVideo from "@components/BackgroundVideo"

const getBackgroundVideo = async () => {
	const res = await fetch(REST_WP + "/pages?slug=home&acf_format=standard")

	const data = await res.json()

	const acf = data[0]?.acf

	const videoData: WP_ImageArrayType = acf?.video
	const placeholderData: WP_ImageArrayType = acf?.placeholderImage

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
