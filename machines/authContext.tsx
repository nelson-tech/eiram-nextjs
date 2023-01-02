import React, { createContext } from "react"
import { useInterpret } from "@xstate/react"
import type { InterpreterFrom } from "xstate"
import { authMachine } from "./auth"

type AuthProviderInputType = {
	children: React.ReactNode
	isAuth: boolean
	user: CLIENT_UserDataType
	authToken: string
}

export const AuthContext = createContext({
	authService: {} as InterpreterFrom<typeof authMachine>,
})

export const AuthProvider = ({ children, isAuth, user, authToken }: AuthProviderInputType) => {
	const authService = useInterpret(authMachine(isAuth ? "loggedIn" : "loggedOut"), {
		context: { user, token: authToken },
	})

	return <AuthContext.Provider value={{ authService }}>{children}</AuthContext.Provider>
}
