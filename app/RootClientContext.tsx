"use client"

import { AuthProvider } from "machines/authContext"
import { AlertsProvider } from "machines/alertsContext"
import { CartProvider } from "machines/cartContext"
import { ModalsProvider } from "machines/modalsContext"

import RootStyleRegistry from "./RootStyleRegistry"
// import useNavigationEvent from "@lib/hooks/useNavigationEvent"
import { Menu_Sitesettings_Colors } from "@lib/api/codegen/graphql"
import getTokensClient from "@lib/utils/getTokensClient"
import getClient from "@api/client"
// import isServer from "@lib/utils/isServer"

type RootClientContextProps = {
	children: React.ReactNode
	colors?: Menu_Sitesettings_Colors
}

const RootClientContext = ({ children, colors }: RootClientContextProps) => {
	// useNavigationEvent()

	getTokensClient().then(({ tokens, isAuth }) => {
		const client = getClient(tokens)
	})

	return (
		<AuthProvider>
			<AlertsProvider>
				<CartProvider>
					<ModalsProvider>
						<RootStyleRegistry colors={colors}>{children}</RootStyleRegistry>
					</ModalsProvider>
				</CartProvider>
			</AlertsProvider>
		</AuthProvider>
	)
}

export default RootClientContext
