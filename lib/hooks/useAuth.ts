import { useContext, useEffect, useState } from "react"
import { useActor } from "@xstate/react"

import useClient from "@api/client"
import {
	LoginInput,
	LoginUserDocument,
	LogoutUserDocument,
	RegisterUserDocument,
	RegisterUserInput,
	ResetUserPasswordDocument,
	SendPasswordResetEmailDocument,
	User,
} from "@api/codegen/graphql"
import { AuthContext } from "machines/authContext"
import useAlerts from "./useAlerts"
import { deleteCookie } from "cookies-next"
import { AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@lib/constants"
import { AuthMachine_Type } from "@lib/types/auth"
import setCookie from "@lib/utils/setCookie"

const errorCodes: { [key: string]: string } = {}

const useAuth = () => {
	const globalServices = useContext(AuthContext)
	const [state] = useActor(globalServices.authService)
	const [isAuth, setIsAuth] = useState(state.value === "loggedIn")

	const { openAlert } = useAlerts()

	const client = useClient()

	const processing = ["authenticating", "loggingIn", "loggingOut"].includes(state.value as string)

	useEffect(() => {
		setIsAuth(state.value === "loggedIn")
	}, [state.value])

	const login = async (input: LoginInput, callback?: () => void) => {
		const loginData = await client.request(LoginUserDocument, { input }).catch((error) => {
			console.warn("Error logging in", error)

			openAlert({
				kind: "error",
				primary: "Error logging in.",
				secondary:
					"Please check the email and password and try again, or try resetting your password.",
				timeout: 5000,
			})
		})

		const login = loginData ? loginData.login : null
		if (login?.user?.jwtAuthToken && login.user.jwtRefreshToken) {
			const { jwtAuthToken, jwtRefreshToken, ...user } = login.user

			// Set authToken in client

			client.setHeader("Authorization", `Bearer ${jwtAuthToken}`)

			// Set cookies
			setCookie(AUTH_TOKEN_KEY, jwtAuthToken)
			setCookie(REFRESH_TOKEN_KEY, jwtRefreshToken)

			openAlert({
				kind: "success",
				primary: `Welcome back${user?.firstName ? `, ${user.firstName}` : ""}!`,
			})

			const authData: AuthMachine_Type = {
				tokens: { auth: jwtAuthToken, refresh: jwtRefreshToken, cart: user.wooSessionToken },
				user: user as User,
			}

			await globalServices.authService.send("LOGIN", {
				input: authData,
			})

			callback && (await callback())
		}
	}

	const logout = async (callback?: () => void) => {
		await client.request(LogoutUserDocument, { input: {} })

		// Delete cookies
		deleteCookie(AUTH_TOKEN_KEY)
		deleteCookie(REFRESH_TOKEN_KEY)

		openAlert({
			primary: "Logged out.",
			kind: "info",
		})
		await globalServices.authService.send("LOGOUT")

		callback && callback()

		openAlert({ kind: "info", primary: "You are now logged out." })
	}

	const register = async (input: RegisterUserInput, callback?: () => void) => {
		const registerData = await client.request(RegisterUserDocument, { input })
		const newUser = registerData?.registerUser?.user
		if (!isAuth && newUser) {
			const { jwtAuthToken, jwtRefreshToken, ...user } = newUser

			// Set cookies
			setCookie(AUTH_TOKEN_KEY, jwtAuthToken)
			setCookie(REFRESH_TOKEN_KEY, jwtRefreshToken)

			openAlert({
				kind: "success",
				primary: `Thank you${user.firstName ? `, ${user.firstName}` : ""}!`,
				secondary: "Your account has been created.",
			})

			const authData: AuthMachine_Type = {
				tokens: { auth: jwtAuthToken, refresh: jwtRefreshToken, cart: user.wooSessionToken },
				user: user as User,
			}

			await globalServices.authService.send("LOGIN", {
				input: authData,
			})

			callback && callback()
		}
	}

	const sendResetPasswordEmail = async (email: string | null, data) => {
		if (email && data.email === email) {
			const resetData = await client.request(SendPasswordResetEmailDocument, { username: email })

			if (resetData.sendPasswordResetEmail.success) {
				openAlert({ kind: "success", primary: "Password Reset Email Sent" })
				return true
			} else {
				openAlert({
					kind: "error",
					primary: "Error resetting password.",
					secondary: "Please check that you've entered the correct email address.",
				})
				return false
			}
		}
	}

	const resetUserPassword = async (key: string, username: string, password: string) => {
		const resetData = await client
			.request(ResetUserPasswordDocument, { key, login: username, password })
			.catch((errors) => {
				const message = errorCodes[errors.message]
					? errorCodes[errors.message]
					: `Error: ${errors.message}`
			})

		const user = (resetData && (resetData.resetUserPassword.user as User)) || null

		if (user) {
			const { jwtAuthToken, jwtRefreshToken, ...plainUser } = user
			// Set cookies
			setCookie(AUTH_TOKEN_KEY, jwtAuthToken)
			setCookie(REFRESH_TOKEN_KEY, jwtRefreshToken)

			openAlert({
				kind: "success",
				primary: `Welcome back${(user?.firstName || user?.lastName) && ","}${
					user?.firstName && ` ${user.firstName}`
				}${user?.lastName && ` ${user.lastName}`}!`,
				secondary: "Your password has been reset.",
			})

			const authData: AuthMachine_Type = {
				tokens: { auth: jwtAuthToken, refresh: jwtRefreshToken, cart: user.wooSessionToken },
				user: plainUser as User,
			}

			await globalServices.authService.send("LOGIN", {
				input: authData,
			})

			return true
		}
		return false
	}

	return {
		processing,
		isAuth,
		matches: state.matches,
		context: state.context,
		status: state.value,
		login,
		logout,
		register,
		sendResetPasswordEmail,
		resetUserPassword,
	}
}

export default useAuth
