"use client"

import { XMarkIcon } from "@heroicons/react/20/solid"

import { MediaItem } from "@api/codegen/graphql"
import useSizes from "./useSizes"

import Modal from "components/Modal"
import Image from "components/Image"

type LightboxPropsType = {
  open: boolean
  close: () => void
  slide: string | MediaItem | null | undefined
}

const Lightbox = ({ open, close, slide }: LightboxPropsType) => {
  const simpleImage = typeof slide === "string"

  const { modalSize } = useSizes({ slide })

  return slide ? (
    <Modal
      open={open}
      closeModal={close}
      panelStyle={"inline-block overflow-hidden rounded-2xl"}
    >
      <div style={modalSize}>
        <div
          onClick={close}
          className={`absolute ${
            simpleImage ? "right-4" : "right-4"
          } opacity-80 bg-gray-500 rounded-md m-4 z-50 cursor-pointer hover:bg-white text-white hover:text-black`}
        >
          <XMarkIcon className="h-8 w-8" />
        </div>
        {simpleImage ? (
          <Image
            src={slide}
            alt={""}
            className="object-contain rounded-lg overflow-hidden"
            fill
            sizes="100vw"
          />
        ) : (
          slide.sourceUrl && (
            <Image
              src={slide.sourceUrl}
              alt={slide.altText ?? ""}
              {...{
                width: slide.mediaDetails?.width ?? parseInt(modalSize.width),
                height:
                  slide.mediaDetails?.height ?? parseInt(modalSize.height),
              }}
              className="rounded-2xl overflow-hidden"
            />
          )
        )}
      </div>
    </Modal>
  ) : (
    <div />
  )
}

export default Lightbox
