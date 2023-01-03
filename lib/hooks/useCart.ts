import { useContext, useEffect, useState } from "react"
import { useActor } from "@xstate/react"

import { CartContext } from "machines/cartContext"
import useAuth from "./useAuth"
import useModals from "./useModals"

const useCart = () => {
	const globalServices = useContext(CartContext)
	const [state] = useActor(globalServices.cartService)

	const send = globalServices.cartService.send

	const { status: officialAuthStatus } = useAuth()
	const { send: modalsSend } = useModals()

	const [authStatus, setAuthStatus] = useState(officialAuthStatus)

	const fetchCart = async () => {
		await send("FETCHCART")
	}

	// Update cart when authentication status changes, except for loading states
	useEffect(() => {
		if (
			["loggedIn", "loggedOut"].includes(officialAuthStatus as string) &&
			authStatus != officialAuthStatus
		) {
			// Remove authToken from cart calls after logging out
			setAuthStatus(officialAuthStatus)
			fetchCart()
		}
	}, [authStatus, officialAuthStatus, send, setAuthStatus])

	const addToCart = async (input: WC_Cart_AddToCartInputType) => {
		await send("ADDITEM", {
			input,
			callback: () => {
				modalsSend("openShoppingCart")
			},
		})
	}

	const updateItem = async (input: { itemKey: string; quantity: number }) => {
		await send("UPDATEITEM", input)
	}

	const removeItem = async (input: { itemKey: string }) => {
		await send("REMOVEITEM", input)
	}

	return {
		fetchCart,
		matches: state.matches,
		state: state.context,
		addToCart,
		updateItem,
		removeItem,
	}
}

export default useCart
