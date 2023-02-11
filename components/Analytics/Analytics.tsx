"use client"

import Script from "next/script"

const Analytics = () => {
	const gTagId = process.env.NEXT_PUBLIC_GTAG_ID

	return (
		<>
			<Script
				id="gtag"
				src={`https://www.googletagmanager.com/gtag/js?id=${gTagId}`}
				strategy="afterInteractive"
			/>
			<Script id="gtag-dataLayer" strategy="afterInteractive">
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
