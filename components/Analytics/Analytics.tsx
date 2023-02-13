"use client"

import Script from "next/script"

const Analytics = () => {
	const gTagId = process.env.NEXT_PUBLIC_GTAG_ID

	const analyticsURL = process.env.NEXT_PUBLIC_ANALYTICS_URL

	return (
		<>
			<Script id="matomo" strategy="afterInteractive">
				{`
					var _paq = window._paq = window._paq || [];
					/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
					_paq.push(['trackPageView']);
					_paq.push(['enableLinkTracking']);
					(function() {
						var u="//${analyticsURL}/";
						_paq.push(['setTrackerUrl', u+'matomo.php']);
						_paq.push(['setSiteId', '1']);
						var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
						g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
					})();
				
			`}
			</Script>
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
