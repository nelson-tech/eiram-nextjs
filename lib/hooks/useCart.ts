import { useContext, useEffect, useState } from "react"
import { useActor } from "@xstate/react"

import { CartContext } from "machines/cartContext"
import useAuth from "./useAuth"
import useModals from "./useModals"
import {
	AddToCartInput,
	ClearCartDocument,
	RemoveItemsFromCartInput,
	UpdateItemQuantitiesInput,
} from "@api/codegen/graphql"
import {
	AddToCartEventType,
	RemoveCartItemEventType,
	UpdateCartItemEventType,
} from "@lib/types/cart"
import useClient from "@api/client"

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

	const addToCart = async (input: AddToCartInput) => {
		await send("ADDITEM", {
			input,
			callback: () => {
				modalsSend("openShoppingCart")
			},
		} as AddToCartEventType)
	}

	const updateItem = async (input: UpdateItemQuantitiesInput) => {
		const event: UpdateCartItemEventType = {
			input,
		}
		await send("UPDATEITEM", event)
	}

	const removeItem = async (input: RemoveItemsFromCartInput) => {
		const event: RemoveCartItemEventType = {
			input,
		}
		await send("REMOVEITEM", event)
	}

	const clearCart = async () => {
		await send("CLEARCART")
	}

	return {
		fetchCart,
		matches: state.matches,
		state: state.context,
		addToCart,
		updateItem,
		removeItem,
		clearCart,
	}
}

export default useCart
