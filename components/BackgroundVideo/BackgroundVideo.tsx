"use client"

import { MediaItem, Page_Bgvideo_VideoFiles } from "@api/codegen/graphql"
import isServer from "@lib/utils/isServer"

type BackgrountVideoInputType = {
  videoData: Page_Bgvideo_VideoFiles[]
  placeholderData: MediaItem
}

const BackgroundVideo = ({
  videoData,
  placeholderData,
}: BackgrountVideoInputType) => {
  const getClientSizes = () => {
    let viewHeight = videoData[0].videoFile?.mediaDetails?.height

    let imageSizing = "width=1920"

    if (!isServer) {
      const windowScale =
        window.innerWidth /
        ((videoData[0].videoFile?.mediaDetails?.width as number) || 1)

      viewHeight =
        ((videoData[0].videoFile?.mediaDetails?.height as number) || 1) *
        windowScale

      imageSizing =
        window.innerWidth > window.innerHeight
          ? `width=${window.innerWidth}`
          : `height=${window.innerHeight}`
    }

    return { imageSizing, viewHeight }
  }

  const { imageSizing, viewHeight } = getClientSizes()
  console.log("Video data", videoData)

  const bgImageURL = `${placeholderData?.sourceUrl}?format=webp&quality=80&${imageSizing}`

  return bgImageURL ? (
    <div
      id="video-container"
      className="w-full h-screen"
      style={{
        backgroundImage: `url('${bgImageURL}')`,
      }}
    >
      {videoData[0].videoFile?.mediaItemUrl &&
        videoData[0].videoFile.mimeType && (
          <video
            autoPlay
            loop
            muted
            id="video"
            className="w-full h-screen object-cover"
            poster={bgImageURL}
          >
            {videoData.map(({ videoFile }) => {
              if (videoFile?.mediaItemUrl && videoFile?.mimeType)
                return (
                  <source
                    src={videoFile.mediaItemUrl}
                    type={videoFile.mimeType}
                  />
                )
            })}
          </video>
        )}
    </div>
  ) : (
    <div style={{ height: `${viewHeight}px` }} />
  )
}

export default BackgroundVideo
