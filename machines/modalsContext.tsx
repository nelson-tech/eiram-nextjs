import React, { createContext } from "react"
import { useInterpret } from "@xstate/react"
import type { InterpreterFrom } from "xstate"
import { modalsMachine } from "./modals"

export const ModalsContext = createContext({
  modalsService: {} as InterpreterFrom<typeof modalsMachine>,
})

export const ModalsProvider = ({ children }: { children: JSX.Element }) => {
  const modalsService = useInterpret(modalsMachine)

  return (
    <ModalsContext.Provider value={{ modalsService }}>
      {children}
    </ModalsContext.Provider>
  )
}
