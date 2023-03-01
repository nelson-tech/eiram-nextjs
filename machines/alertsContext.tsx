import React, { createContext } from "react"
import { useInterpret } from "@xstate/react"
import type { InterpreterFrom } from "xstate"
import { alertsMachine } from "./alerts"

export const AlertsContext = createContext({
  alertsService: {} as InterpreterFrom<typeof alertsMachine>,
})

export const AlertsProvider = ({ children }: { children: JSX.Element }) => {
  const alertsService = useInterpret(alertsMachine)

  return (
    <AlertsContext.Provider value={{ alertsService }}>
      {children}
    </AlertsContext.Provider>
  )
}
