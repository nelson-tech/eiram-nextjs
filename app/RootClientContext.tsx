"use client"

import { AuthProvider } from "machines/authContext"
import { AlertsProvider } from "machines/alertsContext"
import { CartProvider } from "machines/cartContext"
import { ModalsProvider } from "machines/modalsContext"

import RootStyleRegistry from "./RootStyleRegistry"
import { Menu_Sitesettings_Colors } from "@lib/api/codegen/graphql"
import getTokensClient from "@lib/utils/getTokensClient"
import getClient from "@api/client"

type RootClientContextProps = {
	children: React.ReactNode
	colors?: Menu_Sitesettings_Colors
}

const RootClientContext = ({ children, colors }: RootClientContextProps) => {
	getTokensClient().then(({ tokens }) => {
		const client = getClient(tokens)
	})

	return (
		<AuthProvider>
			<CartProvider>
				<AlertsProvider>
					<ModalsProvider>
						<RootStyleRegistry colors={colors}>{children}</RootStyleRegistry>
					</ModalsProvider>
				</AlertsProvider>
			</CartProvider>
		</AuthProvider>
	)
}

export default RootClientContext
