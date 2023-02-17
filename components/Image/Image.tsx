"use client"

import { Transition } from "@headlessui/react"
import NextImage, { ImageProps } from "next/image"
import { Fragment } from "react"

const Image = (props: ImageProps) => {
  return (
    <Transition
      as={Fragment}
      appear={true}
      show={true}
      enter="transition-opacity duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <NextImage {...props} />
    </Transition>
  )
}

export default Image
