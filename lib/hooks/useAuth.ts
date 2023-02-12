import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useActor } from "@xstate/react"

import {
	Customer,
	LoginInput,
	RegisterCustomerInput,
	ResetUserPasswordInput,
	SendPasswordResetEmailInput,
} from "@api/codegen/graphql"
import {
	AuthLoginEvent_Type,
	AuthLogoutEvent_Type,
	AuthRegisterEvent_Type,
	AuthResetPasswordEvent_Type,
	AuthSendResetEmailEvent_Type,
	AuthUpdateCustomerEvent_Type,
} from "@lib/types/auth"
import { AuthContext } from "machines/authContext"
import useAlerts from "./useAlerts"

const processingStates = ["loggedIn", "loggedOut"]

const useAuth = () => {
	const globalServices = useContext(AuthContext)
	const [state] = useActor(globalServices.authService)
	const [isAuth, setIsAuth] = useState(state.value === "loggedIn")
	const [processing, setProcessing] = useState(!processingStates.includes(state.value as string))

	const { openAlert } = useAlerts()
	const router = useRouter()

	// Keep isAuth and processing current as state.value changes
	useEffect(() => {
		setIsAuth(state.value === "loggedIn")
		setProcessing(!processingStates.includes(state.value as string))
	}, [state.value])

	const login = async (input: LoginInput, callback?: () => void) => {
		const event: AuthLoginEvent_Type = {
			input,
			callback: (success, firstName?) => {
				success
					? openAlert({
							kind: "success",
							primary: `Welcome back${firstName ? `, ${firstName}` : ""}!`,
					  })
					: openAlert({
							kind: "error",
							primary: "Error logging in.",
							secondary:
								"Please check the email and password and try again, or try resetting your password.",
							timeout: 5000,
					  })

				callback && callback()

				// Force page reload to refresh any server-loaded auth data
				router.refresh()
			},
		}

		await globalServices.authService.send("LOGIN", event)
	}

	const logout = async (callback?: () => void) => {
		const event: AuthLogoutEvent_Type = {
			callback: (success) => {
				success
					? openAlert({
							primary: "You are now logged out.",
							kind: "info",
					  })
					: openAlert({
							primary: "Error logging out.",
							secondary: "Please try again.",
							timeout: 5000,
							kind: "error",
					  })

				callback && callback()

				// Force page reload to refresh any server-loaded auth data
				router.refresh()
			},
		}

		await globalServices.authService.send("LOGOUT", event)
	}

	const register = async (input: RegisterCustomerInput, callback?: () => void) => {
		const event: AuthRegisterEvent_Type = {
			input,
			callback: (success, firstName) => {
				success
					? openAlert({
							kind: "success",
							primary: `Thank you${firstName ? `, ${firstName}` : ""}!`,
							secondary: "Your account has been created.",
					  })
					: openAlert({
							primary: "Error registering account.",
							secondary: "Please try again.",
							timeout: 5000,
							kind: "error",
					  })

				callback && callback()

				// Force page reload to refresh any server-loaded auth data
				router.refresh()
			},
		}
		await globalServices.authService.send("REGISTER", event)
	}

	const sendResetPasswordEmail = async (input: SendPasswordResetEmailInput) => {
		const event: AuthSendResetEmailEvent_Type = {
			input,
			callback: (success) => {
				success
					? openAlert({ kind: "success", primary: "Password Reset Email Sent" })
					: openAlert({
							kind: "error",
							primary: "Error sending password reset email.",
							secondary: "Please check that you've entered the correct email address.",
							timeout: 5000,
					  })
			},
		}
		await globalServices.authService.send("SENDRESETEMAIL", event)
	}

	const resetUserPassword = async (input: ResetUserPasswordInput) => {
		const event: AuthResetPasswordEvent_Type = {
			input,
			callback: (success, firstName) => {
				success
					? openAlert({
							kind: "success",
							primary: `Welcome back${firstName ? `, ${firstName}` : ""}!`,
							secondary: "Your password has been reset.",
					  })
					: openAlert({
							kind: "success",
							primary: "Error resetting password.",
							secondary: "Please check that you've entered the correct email address and key.",
							timeout: 5000,
					  })

				// Force page reload to refresh any server-loaded auth data
				router.refresh()
			},
		}

		await globalServices.authService.send("RESETPASSWORD", event)
	}

	const updateCustomer = async (customer: Customer) => {
		const event: AuthUpdateCustomerEvent_Type = {
			customer,
		}
		await globalServices.authService.send("UPDATECUSTOMER", event)
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
		updateCustomer,
	}
}

export default useAuth
