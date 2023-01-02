import { AuthContext } from "machines/authContext"
import { useContext } from "react"
import { useActor } from "@xstate/react"

const useAuth = () => {
	const globalServices = useContext(AuthContext)
	const [state] = useActor(globalServices.authService)

	const processing = ["authenticating", "loggingIn", "loggingOut"].includes(state.value as string)
	const isAuth = state.value === "loggedIn"

	return {
		processing,
		isAuth,
		send: globalServices.authService.send,
		matches: state.matches,
		context: state.context,
		status: state.value,
	}
}

export default useAuth
