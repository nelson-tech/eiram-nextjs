"use client"

import { Fragment, useState } from "react"
import NextImage from "next/image"
import type { ImageProps } from "next/image"
import { Transition } from "@headlessui/react"

type ImagePropsType = ImageProps

const Image = (props: ImagePropsType) => {
  const [loading, setLoading] = useState(true)

  return (
    <div
      className={`
       w-full h-full overflow-hidden relative`}
    >
      <Transition
        appear={true}
        show={loading}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-50"
        leave="transition-opacity duration-500"
        leaveFrom="opacity-50"
        leaveTo="opacity-0"
        className="absolute top-0 left-0 z-30 w-full h-full "
      >
        <NextImage
          {...{
            ...props,
            src: `${props.src}?width=200&blur=12&format=webp&quality=60&grayscale=1`,
          }}
          unoptimized
        />
      </Transition>
      <NextImage
        {...props}
        onLoadingComplete={(img) => {
          setLoading(false)
          // props.onLoadingComplete && props.onLoadingComplete(img)
        }}
        className={`${
          loading ? "opacity-0" : "opacity-100"
        } transition-opacity ${props.className ? props.className : ""}`}
      />
    </div>
  )
}

export default Image
