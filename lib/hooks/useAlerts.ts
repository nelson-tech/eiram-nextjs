import { useContext } from "react"
import { useActor } from "@xstate/react"

import { AlertsContext } from "machines/alertsContext"

const useAlerts = () => {
	const globalServices = useContext(AlertsContext)
	const [state] = useActor(globalServices.alertsService)

	const openAlert = (props: AlertState) => {
		globalServices.alertsService.send("OPEN", props)
	}

	return {
		send: globalServices.alertsService.send,
		matches: state.matches,
		context: state.context,
		openAlert,
	}
}

export default useAlerts
