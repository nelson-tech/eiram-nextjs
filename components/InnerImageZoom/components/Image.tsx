// Modified from https://github.com/laurenashpole/react-inner-image-zoom

import NextImage, { ImageProps } from "next/image"

const Image = ({
  src,
  alt,
  title,
  width,
  height,
  hasSpacer,
  imgAttributes,
  fadeDuration,
  isZoomed,
}: {
  src: string
  alt?: string
  title?: string
  width: number | undefined
  height: number | undefined
  hasSpacer: boolean | undefined
  imgAttributes: ImageProps
  fadeDuration: number
  isZoomed: boolean
}) => {
  const createSpacer = width && height && hasSpacer
  return (
    <div
      className="relative aspect-square rounded-md overflow-hidden m-2 sm:m-0"
      style={{
        paddingTop: createSpacer ? (height / width) * 100 + "%" : 0,
      }}
    >
      <NextImage
        {...imgAttributes}
        alt={alt ?? ""}
        title={title}
        className={
          "iiz__img object-cover aspect-square w-full" +
          (imgAttributes.className || "") +
          " " +
          (isZoomed ? "iiz__img--hidden" : "") +
          " " +
          (createSpacer ? "iiz__img--abs" : "")
        }
        style={{
          transition:
            "opacity 0ms linear " +
            (isZoomed ? fadeDuration : 0) +
            "ms, visibility 0ms linear " +
            (isZoomed ? fadeDuration : 0) +
            "ms",
        }}
        src={src}
        width={width}
        height={height}
        // fill
        // sizes="(max-width: 800px) 100vw,50vw"
      />
    </div>
  )
}

export default Image
