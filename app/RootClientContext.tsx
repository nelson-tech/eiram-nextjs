"use client"

import { AUTH_ENDPOINT } from "@lib/constants"
import { AuthProvider } from "machines/authContext"
import { AlertsProvider } from "machines/alertsContext"
import { CartProvider } from "machines/cartContext"
import { ModalsProvider } from "machines/modalsContext"

import RootStyleRegistry from "./RootStyleRegistry"

type RootClientContextProps = {
	children: React.ReactNode
	colors?: WP_MENU["acf"]["colors"]
	authData: API_AuthResponseType
}

const RootClientContext = ({ children, colors, authData }: RootClientContextProps) => {
	const { needsRefresh, isAuth, cart, user, tokens } = authData
	if (needsRefresh) {
		// Make refresh call on client
		const body: API_SetInputType = { action: "SET", newCookies: needsRefresh }

		fetch(AUTH_ENDPOINT, { method: "POST", body: JSON.stringify(body) })
	}

	return (
		<AuthProvider isAuth={isAuth} user={user} authToken={tokens.auth}>
			<AlertsProvider>
				<CartProvider cart={cart}>
					<ModalsProvider>
						<RootStyleRegistry colors={colors}>{children}</RootStyleRegistry>
					</ModalsProvider>
				</CartProvider>
			</AlertsProvider>
		</AuthProvider>
	)
}

export default RootClientContext
