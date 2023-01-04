"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

type ImageMagnifierInputType = {
	src: string
	alt?: string
	width?: string
	height?: string
	magnifierHeight?: number
	magnifieWidth?: number
	zoomLevel?: number
}

const ImageMagnifier = ({
	src,
	alt,
	width,
	height,
	magnifierHeight = 100,
	magnifieWidth = 100,
	zoomLevel = 1.5,
}: ImageMagnifierInputType) => {
	const [[x, y], setXY] = useState([0, 0])
	const [[imgWidth, imgHeight], setSize] = useState([0, 0])
	const [showMagnifier, setShowMagnifier] = useState(false)
	const imgRef = useRef()

	useEffect(() => {
		if (imgRef.current) {
			const width = (imgRef.current as any).clientWidth
			const height = (imgRef.current as any).clientHeight
			console.log("Settings", width, height)
		}
	})

	return (
		<>
			<div className="relative aspect-square rounded-md overflow-hidden m-2 sm:m-0">
				<Image
					src={src}
					alt={alt}
					ref={imgRef}
					fill
					sizes="(max-width: 800px) 100vw,50vw"
					className="object-cover"
					onMouseEnter={(e) => {
						// update image size and turn-on magnifier
						const elem = e.currentTarget
						const { width, height } = elem.getBoundingClientRect()
						console.log("WH", width, height)

						if (imgRef.current) {
							setSize([width, height])
						}
						setShowMagnifier(true)
					}}
					onMouseMove={(e) => {
						// update cursor position
						const elem = e.currentTarget
						const { top, left } = elem.getBoundingClientRect()

						// calculate cursor position on the image
						const x = e.pageX - left - window.pageXOffset
						const y = e.pageY - top - window.pageYOffset
						setXY([x, y])
					}}
					onMouseLeave={() => {
						// close magnifier
						setShowMagnifier(false)
					}}
				/>

				{/* <div
				style={{
					position: "relative",
					height: height,
					width: width,
				}}
			>
				<img
					src={src}
					style={{ height: height, width: width }}
					onMouseEnter={(e) => {
						// update image size and turn-on magnifier
						const elem = e.currentTarget
						const { width, height } = elem.getBoundingClientRect()
						setSize([width, height])
						setShowMagnifier(true)
					}}
					onMouseMove={(e) => {
						// update cursor position
						const elem = e.currentTarget
						const { top, left } = elem.getBoundingClientRect()

						// calculate cursor position on the image
						const x = e.pageX - left - window.pageXOffset
						const y = e.pageY - top - window.pageYOffset
						setXY([x, y])
					}}
					onMouseLeave={() => {
						// close magnifier
						setShowMagnifier(false)
					}}
					alt={"img"}
				/> */}
				<div
					className="rounded-full overflow-hidden"
					style={{
						display: showMagnifier ? "" : "none",
						position: "absolute",

						// prevent magnifier blocks the mousemove event of img
						pointerEvents: "none",
						// set size of magnifier
						height: `${magnifierHeight}px`,
						width: `${magnifieWidth}px`,
						// move element center to cursor pos
						top: `${y - magnifierHeight / 2}px`,
						left: `${x - magnifieWidth / 2}px`,
						opacity: "1", // reduce opacity so you can verify position
						border: "1px solid lightgray",
						backgroundColor: "white",
						backgroundImage: `url('${src}')`,
						backgroundRepeat: "no-repeat",

						//calculate zoomed image size
						backgroundSize: ` ${imgHeight * zoomLevel}px`,

						//calculate position of zoomed image.
						backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
						backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
					}}
				></div>
			</div>
		</>
	)
}

export default ImageMagnifier
