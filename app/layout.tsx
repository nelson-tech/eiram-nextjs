import "./globals.css"

import localFont from "@next/font/local"

import getTokens from "@lib/utils/getTokens"
import getMenu from "@lib/server/getMenu"
import { AUTH_ENDPOINT } from "@lib/constants"

import RootClientContext from "./RootClientContext"
import Header from "@components/layout/header"
import Modals from "@components/layout/modals"
import Footer from "@components/layout/footer"
import Alerts from "@components/Alerts"
import ScrollToTop from "@components/ScrollToTop"
import Analytics from "@components/Analytics"

const getAuthData = async (): Promise<API_AuthResponseType> => {
	const { tokens } = getTokens()

	try {
		const body: API_AuthInputType = { action: "INIT", tokens }
		const authResponse = await fetch(AUTH_ENDPOINT, {
			method: "POST",
			body: JSON.stringify(body),
		})

		const authData: API_AuthResponseType = await authResponse.json()

		return authData
	} catch (error) {
		return { isAuth: false, needsRefresh: null }
	}
}

const font = localFont({
	src: "./Karla-Regular.ttf",
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const menuPromise = getMenu()

	const authPromise = getAuthData()

	const [menuData, authData] = await Promise.all([menuPromise, authPromise])

	const { colors, menuItems, socialMedia } = menuData

	return (
		<html lang="en-us" className={font.className}>
			<RootClientContext colors={colors} authData={authData}>
				<body>
					<div id="top" />
					<Header menuItems={menuItems} />
					<div className="min-h-screen bg-white z-0">{children}</div>
					<Footer socialMedia={socialMedia} />
					<Modals menuItems={menuItems} />
					<Alerts />
					<ScrollToTop />
					<Analytics />
				</body>
			</RootClientContext>
		</html>
	)
}
