import { useContext } from "react"
import { useActor } from "@xstate/react"

import { ModalsContext } from "machines/modalsContext"

const useModals = () => {
	const globalServices = useContext(ModalsContext)
	const [state] = useActor(globalServices.modalsService)

	return { send: globalServices.modalsService.send, matches: state.matches }
}

export default useModals
