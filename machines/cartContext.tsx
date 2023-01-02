import React, { createContext } from "react"
import { useInterpret } from "@xstate/react"
import type { InterpreterFrom } from "xstate"
import { cartMachine } from "./cart"

type CartProviderParamsType = { children: React.ReactNode; cart: WC_CartType }

export const CartContext = createContext({
	cartService: {} as InterpreterFrom<typeof cartMachine>,
})

export const CartProvider = ({ children, cart }: CartProviderParamsType) => {
	const cartService = useInterpret(cartMachine, {
		context: { cart },
	})

	return <CartContext.Provider value={{ cartService }}>{children}</CartContext.Provider>
}
