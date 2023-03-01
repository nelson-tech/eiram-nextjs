import "../styles/globals.css"

import localFont from "next/font/local"

import {
  MenuItem,
  Menu_Sitesettings_Footer_Socialmedia,
} from "@lib/api/codegen/graphql"
import getMenu from "@lib/server/getMenu"

import RootClientContext from "./RootClientContext"
import Header from "components/Layout/Header"
import Modals from "components/Layout/Modals"
import Footer from "components/Layout/Footer"
import Alerts from "components/Alerts"
import ScrollToTop from "components/ScrollToTop"
import Analytics from "components/Analytics"

const font = localFont({
  src: "./Karla-Regular.ttf",
})

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const mainMenu = await getMenu()

  return (
    <html lang="en-us" className={font.className}>
      <body>
        <RootClientContext colors={mainMenu?.siteSettings?.colors ?? undefined}>
          <div id="top" />
          {mainMenu?.menuItems?.nodes && (
            <Header menuItems={mainMenu.menuItems.nodes as MenuItem[]} />
          )}
          <div className="min-h-screen bg-white z-0">{children}</div>
          <Footer
            socialMedia={
              (mainMenu?.siteSettings?.footer
                ?.socialmedia as Menu_Sitesettings_Footer_Socialmedia[]) ??
              undefined
            }
          />
          {mainMenu?.menuItems?.nodes && (
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

export const metadata = {
  title: {
    default: "Eiram Knitwear",
    template: "%s",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
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
