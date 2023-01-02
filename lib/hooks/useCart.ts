import { CartContext } from "machines/cartContext"
import { useContext, useEffect, useState } from "react"
import { useActor } from "@xstate/react"
import useAuth from "./useAuth"

const useCart = () => {
	const globalServices = useContext(CartContext)
	const [state] = useActor(globalServices.cartService)

	const { status: officialAuthStatus } = useAuth()
	const [authStatus, setAuthStatus] = useState(officialAuthStatus)

	const send = globalServices.cartService.send

	// Update cart when authentication status changes, except for loading states
	useEffect(() => {
		if (
			["loggedIn", "loggedOut"].includes(officialAuthStatus as string) &&
			authStatus != officialAuthStatus
		) {
			// Remove authToken from cart calls after logging out
			setAuthStatus(officialAuthStatus)
			send("FETCHCART")
		}
	}, [authStatus, officialAuthStatus, send, setAuthStatus])

	return {
		send,
		matches: state.matches,
		state: state.context,
		cart: state.context.cart,
		itemLoading: state.context.itemLoading,
		loading: state.context.loading,
	}
}

export default useCart
