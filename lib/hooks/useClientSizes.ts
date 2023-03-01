"use client"

import { useCallback, useState } from "react"

import { Page_Bgvideo_VideoFiles } from "@api/codegen/graphql"
import isServer from "@lib/utils/isServer"

const useClientSizes = () => {
  const [viewHeight, setViewHeight] = useState<number | null | undefined>()
  const [imageSizing, setImageSizing] = useState<string | null | undefined>()

  const getClientSizes = useCallback(
    (videoData: Page_Bgvideo_VideoFiles | null | undefined) => {
      if (!isServer) {
        const windowScale =
          window.innerWidth /
          ((videoData?.videoFile?.mediaDetails?.width as number) || 1)

        setViewHeight(
          ((videoData?.videoFile?.mediaDetails?.height as number) || 1) *
            windowScale
        )

        setImageSizing(
          window.innerWidth > window.innerHeight
            ? `width=${window.innerWidth}`
            : `height=${window.innerHeight}`
        )
      } else {
        setViewHeight(videoData?.videoFile?.mediaDetails?.height)

        setImageSizing("width=1920")
      }
    },
    []
  )

  return { imageSizing, viewHeight, getClientSizes }
}

export default useClientSizes
