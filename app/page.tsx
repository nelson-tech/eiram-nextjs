import BackgroundVideo from "@components/BackgroundVideo"
import useClient from "@api/client"
import { GetBackgroundVideoDocument, MediaItem } from "@api/codegen/graphql"

const getBackgroundVideo = async () => {
	const client = useClient()
	const bgVideoData = await client.request(GetBackgroundVideoDocument)

	return bgVideoData.page.bgVideo
}

const HomePage = async () => {
	const { video, placeholderimage } = await getBackgroundVideo()

	return (
		<>
			<BackgroundVideo
				videoData={video as MediaItem}
				placeholderData={placeholderimage as MediaItem}
			/>
		</>
	)
}

export default HomePage
