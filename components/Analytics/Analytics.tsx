"use client"

import Script from "next/script"
import Image from "next/image"

const Analytics = () => {
	const trackingPixel = process.env.NEXT_PUBLIC_TRACKING_PIXEL_URL
	const trackingScript = process.env.NEXT_PUBLIC_TRACKING_SCRIPT_URL

	const gTagId = process.env.NEXT_PUBLIC_GTAG_ID

	return (
		<>
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${gTagId}`}
				strategy="afterInteractive"
			/>
			<Script id="gtag" strategy="afterInteractive">
				{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());

						gtag('config', '${gTagId}');
				`}
			</Script>
		</>
	)
}

export default Analytics
