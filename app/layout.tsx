import "../styles/globals.css"

import localFont from "@next/font/local"

import { MenuItem } from "@lib/api/codegen/graphql"
import getMenu from "@lib/server/getMenu"

import RootClientContext from "./RootClientContext"
import Header from "components/layout/header"
import Modals from "components/layout/modals"
import Footer from "components/layout/footer"
import Alerts from "components/Alerts"
import ScrollToTop from "components/ScrollToTop"
import Analytics from "components/Analytics"
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface"

const font = localFont({
	src: "./Karla-Regular.ttf",
})

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
	const { data } = await getMenu()

	const { mainMenu } = data

	return (
		<html lang="en-us" className={font.className}>
			<body>
				<RootClientContext colors={mainMenu.siteSettings.colors}>
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
				</RootClientContext>
			</body>
		</html>
	)
}

export default RootLayout

// @ts-ignore
export async function generateMetadata() {
	const metaData: Metadata = {
		title: {
			default: "Eiram Knitwear",
			template: "%s | Eiram Knitwear",
		},
		icons: {
			icon: "/favicon.png",
		},
		robots: {
			index: true,
			follow: true,
			nocache: false,
			googleBot: {
				index: true,
				follow: true,
				noimageindex: false,
				"max-video-preview": -1,
				"max-image-preview": "large",
				"max-snippet": -1,
			},
		},
	}

	return metaData
}
