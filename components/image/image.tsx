"use client"

import NextImage from "next/image"

type ImageProps = {
	src: string
	alt: string
}
const Image = ({ src, alt }: ImageProps) => {
	return <NextImage src={src} alt={alt} />
}

export default Image
