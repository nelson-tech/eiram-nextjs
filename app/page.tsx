import { Metadata } from "next/types"

import {
  MediaItem,
  Page_Bgvideo_VideoFiles,
  RankMathPostTypeSeo,
} from "@api/codegen/graphql"
import getHomeData from "@lib/server/getHomeData"
import parseMetaData from "@lib/utils/parseMetaData"

import BackgroundVideo from "components/BackgroundVideo"

const HomePage = async () => {
  const home = await getHomeData()

  const videoFiles = home?.bgVideo?.videoFiles
  const placeholderimage = home?.bgVideo?.placeholderimage

  return (
    <>
      <div>
        {videoFiles && videoFiles.length > 0 && (
          <BackgroundVideo
            videoData={videoFiles as Page_Bgvideo_VideoFiles[]}
            placeholderData={placeholderimage as MediaItem}
          />
        )}
      </div>
    </>
  )
}

export default HomePage

export const revalidate = 60 // revalidate this page every 60 seconds

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHomeData()

  const metaData = parseMetaData({
    ...home?.seo,
    title: null,
  } as RankMathPostTypeSeo)

  return metaData
}
