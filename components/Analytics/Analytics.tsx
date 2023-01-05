"use client"

import Script from "next/script"

const Analytics = () => {
	const trackingPixel = process.env.NEXT_PUBLIC_TRACKING_PIXEL_URL
	const trackingScript = process.env.NEXT_PUBLIC_TRACKING_SCRIPT_URL

	return (
		<>
			<noscript>
				<img src={trackingPixel} />
			</noscript>
			<Script src={trackingScript} defer />
		</>
	)
}

export default Analytics
