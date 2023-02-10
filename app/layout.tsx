import "styles/globals.css"

import localFont from "@next/font/local"

import { MenuItem } from "@lib/api/codegen/graphql"
import getMenu from "@lib/server/getMenu"

import RootClientContext from "./RootClientContext"
import Header from "@components/layout/header"
import Modals from "@components/layout/modals"
import Footer from "@components/layout/footer"
import Alerts from "@components/Alerts"
import ScrollToTop from "@components/ScrollToTop"
import Analytics from "@components/Analytics"

const font = localFont({
	src: "./Karla-Regular.ttf",
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const { data } = await getMenu()

	const { mainMenu } = data

	return (
		<html lang="en-us" className={font.className}>
			<RootClientContext colors={mainMenu.siteSettings.colors}>
				<body>
					<div id="top" />
					{mainMenu.menuItems.nodes && (
						<Header menuItems={mainMenu.menuItems.nodes as MenuItem[]} />
					)}
					<div className="min-h-screen bg-white z-0">{children}</div>
					<Footer socialMedia={mainMenu.siteSettings.footer.socialmedia} />
					{mainMenu.menuItems.nodes && (
						<Modals menuItems={mainMenu.menuItems.nodes as MenuItem[]} />
					)}
					<Alerts />
					<ScrollToTop />
					<Analytics />
				</body>
			</RootClientContext>
		</html>
	)
}
