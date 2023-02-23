"use client"

import { useEffect } from "react"

import { MediaItem, Page_Bgvideo_VideoFiles } from "@api/codegen/graphql"
import useClientSizes from "@lib/hooks/useClientSizes"

type BackgrountVideoInputType = {
  videoData: Page_Bgvideo_VideoFiles[]
  placeholderData: MediaItem
}

const BackgroundVideo = ({
  videoData,
  placeholderData,
}: BackgrountVideoInputType) => {
  const { imageSizing, viewHeight, getClientSizes } = useClientSizes()

  useEffect(() => {
    getClientSizes(videoData[0])
  }, [videoData, getClientSizes])

  const bgImageURL = `${placeholderData?.sourceUrl}?format=webp&quality=80&${imageSizing}`

  return bgImageURL ? (
    <div id="video-container" className="w-full h-screen">
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
                    key={videoFile.id}
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
