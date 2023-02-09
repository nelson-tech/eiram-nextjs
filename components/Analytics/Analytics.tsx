"use client"

import Script from "next/script"
import Image from "next/image"

const Analytics = () => {
	const trackingPixel = process.env.NEXT_PUBLIC_TRACKING_PIXEL_URL
	const trackingScript = process.env.NEXT_PUBLIC_TRACKING_SCRIPT_URL

	return (
		<>
			<noscript>
				<Image alt="Info Pixel" src={trackingPixel} width={1} height={1} />
			</noscript>
			<Script src={trackingScript} defer />
		</>
	)
}

export default Analytics
