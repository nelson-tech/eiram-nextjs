import { GetBackgroundVideoQuery, MediaItem } from "@api/codegen/graphql"

import BackgroundVideo from "@components/BackgroundVideo"
import getCachedQuery from "@lib/server/getCachedQuery"

const HomePage = async () => {
	const { data } = await getCachedQuery<GetBackgroundVideoQuery>("getBackgroundVideo")

	const { video, placeholderimage } = data?.page?.bgVideo

	return (
		<>
			<div>
				<BackgroundVideo
					videoData={video as MediaItem}
					placeholderData={placeholderimage as MediaItem}
				/>
			</div>
		</>
	)
}

export const revalidate = 60 // revalidate this page every 60 seconds

export default HomePage
