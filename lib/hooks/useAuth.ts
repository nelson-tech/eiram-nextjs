import { AuthContext } from "machines/authContext"
import { useContext } from "react"
import { useActor } from "@xstate/react"
import useAlerts from "./useAlerts"

const useAuth = () => {
	const globalServices = useContext(AuthContext)
	const [state] = useActor(globalServices.authService)

	const { openAlert } = useAlerts()

	const processing = ["authenticating", "loggingIn", "loggingOut"].includes(state.value as string)
	const isAuth = state.value === "loggedIn"

	const login = async (input: WP_AUTH_LoginInputType, callback?: () => void) => {
		await globalServices.authService.send("LOGIN", {
			input,
			callback: async (data?: API_AuthResponseType) => {
				callback && callback()

				data?.isAuth
					? openAlert({
							kind: "success",
							primary: `Welcome back${data?.user?.firstName ? `, ${data.user.firstName}` : ""}!`,
					  })
					: openAlert({
							kind: "error",
							primary: "Error logging in.",
							secondary: "Please try again, or try resetting your password.",
							timeout: 5000,
					  })
			},
		})
	}

	const logout = async (callback?: () => void) => {
		await globalServices.authService.send("LOGOUT", {
			callback: async () => {
				callback && callback()

				openAlert({ kind: "info", primary: "You are now logged out." })
			},
		})
	}

	const register = async (input: WP_RegisterUserInputType, callback?: () => void) => {
		await globalServices.authService.send("REGISTER", {
			input,
		})

		callback && callback()

		openAlert({
			kind: "success",
			primary: `Thank you${
				state.context.user.firstName ? `, ${state.context.user.firstName}` : ""
			}!`,
			secondary: "Your account has been created.",
		})
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
	}
}

export default useAuth
