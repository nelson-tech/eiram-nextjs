import { MediaItem, RankMathPostTypeSeo } from "@api/codegen/graphql"
import getHomeData from "@lib/server/getHomeData"
import parseMetaData from "@lib/utils/parseMetaData"

import BackgroundVideo from "component/BackgroundVideo"

const HomePage = async () => {
	const home = await getHomeData()

	const video = home?.bgVideo?.video
	const placeholderimage = home?.bgVideo?.placeholderimage

	// const { video, placeholderimage } = home?.bgVideo

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

export default HomePage

export const revalidate = 60 // revalidate this page every 60 seconds

// @ts-ignore
export async function generateMetadata({ params }: ProductPageParamsType) {
	const home = await getHomeData()

	const metaData = parseMetaData({ ...home?.seo, title: null } as RankMathPostTypeSeo)

	return metaData
}
