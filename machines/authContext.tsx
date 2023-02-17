import React, { createContext } from "react"
import { useInterpret } from "@xstate/react"
import type { InterpreterFrom } from "xstate"
import { authMachine } from "./auth"

type AuthProviderInputType = {
  children: React.ReactNode
}

export const AuthContext = createContext({
  authService: {} as InterpreterFrom<typeof authMachine>,
})

export const AuthProvider = ({ children }: AuthProviderInputType) => {
  const authService = useInterpret(authMachine("authenticating"))

  return (
    <AuthContext.Provider value={{ authService }}>
      {children}
    </AuthContext.Provider>
  )
}
