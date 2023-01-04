import "./globals.css"

import localFont from "@next/font/local"

import useAPI from "@lib/hooks/useAPI"
import getTokens from "@lib/utils/getTokens"
import { AUTH_ENDPOINT } from "@lib/constants"

import RootClientContext from "./RootClientContext"
import Header from "@components/layout/header"
import Modals from "@components/layout/modals"
import Footer from "@components/layout/footer"
import Alerts from "@components/Alerts"

const getMainMenu = async () => {
	const { fetchMenu } = useAPI()

	const data: WP_MENU = await (await fetchMenu())?.json()

	const colors = data?.acf?.colors ?? null
	const menuItems = data?.items ?? null
	const socialMedia = data?.acf?.footer?.socialMedia ?? null

	return { colors, menuItems, socialMedia }
}

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
	const menuPromise = getMainMenu()

	const authPromise = getAuthData()

	const [menuData, authData] = await Promise.all([menuPromise, authPromise])

	const { colors, menuItems, socialMedia } = menuData

	return (
		<html lang="en" className={font.className}>
			<head>
				<title>Next.js</title>
			</head>
			<RootClientContext colors={colors} authData={authData}>
				<body>
					<Header menuItems={menuItems} />
					<div className="min-h-screen bg-white z-0">{children}</div>
					<Footer socialMedia={socialMedia} />
					<Modals menuItems={menuItems} />
					<Alerts />
				</body>
			</RootClientContext>
		</html>
	)
}
