import { assign, createMachine } from "xstate"

import { CART_ENDPOINT } from "@lib/constants"

import type { Typegen0 } from "./cart.typegen"
import getCart from "@lib/wp/api/getCart"

// const getAuthToken = async () => {
//   const data = await fetch(REST_AUTH_URI, "")
// }

export const cartMachine =
	/** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgOjVsAdugJYDGyJBUAxBAPYFjbEEBudA1k3pgMKZhSXAE6JQABzqxiJBmJAAPRAFYA7AA5s6gCwBGZQCYAnEd0A2M6oDMAGhABPRAFpdB7KpMHtq3etUAGKx0rMwBfULseXAwBIjIKFhowYWE6YWxxABsKADM0gFtorH5BEXlJaVkCeSUEXV0rLSN-M39lNSNVAytAu0cEA2VGqy9dI0srKw9tbWVwyJjsaShGCABJAmoAZTWAcQA5AHkAVQAVcqkZYjkkRURdf0fsI20WowMP-3rrPsQzK2U2FcJm0Blc-jBRis8xAUWWq0OGG2e32a32F0q12qt1qym0mhCJlUFjGZlB6l+CEMZi0oyhgW0ZheBhhcOIK0SG1oDCYLHYXCW7IIGwxVxuoFq6imtOMyjaBi6Y1UlLB2G0U386vGUKM7SMrMW8M5m2SqXSWVyBUFKxFtwqYuxEsQxO0aqhGkMBnU+gpDmcuuwZm66jB6jM3sZynUBqw1oIiUR6G5jGYbE4THhidFVXk-VUXXc7weJma+e0dlqrm62C99KmQY8gRjOCNVET1FNaQy2XQeWEhUzGGzWJq9w+jVrPXrCuatj9CC6ro8YP8Jf8ZfCERABDoEDg8iiPEIJHIlCgw-FdwQemeJfUYZ8crlZmUlJc-kL7xC-nUnSmPTCLc2RWSBbQkS4cxxRAjB0Z5lH+LwzF8KxfF0SldCXR5iQsHQow8VQ5iAw0hUgRNsE4C9HSvDDdCBAj8weMtrBeSkCKMbBAgeIYwSsTxtGbONSIwbAcmQYhMlQYQwEo0c6hvXR6J8ddVG8Xjy3nb1ASmB51EeJlGVcAT4SE9AZKguoFLotQlKYtTKXDGlAlXX96gaf5AIWWNWygMCQHtSCnQQf4PyDBSg2-AF1xVdpsBGPQdB8BTfG6IyhQTIc7QgkdzKhNxjCQ3iAghWdWILZdixMZT+KIrAzMCyySxgh99DaFpX3nFxw0DYMwUse9jHXTdQiAA */
	createMachine(
		{
			tsTypes: {} as import("./cart.typegen").Typegen0,
			id: "cart",
			initial: "cartLoaded",
			context: {
				cart: null as WC_CartType | null | undefined,
				loading: false as boolean,
				itemLoading: null as { itemKey: string; quantity: number } | null,
			},
			predictableActionArguments: true,
			states: {
				fetchingCart: {
					invoke: {
						src: "fetchCart",
						id: "fetchCart",
						onDone: [{ actions: "setCart", target: "cartLoaded" }],
					},
					entry: ["setLoading"],
				},
				updatingCartItem: {
					invoke: {
						src: "updateCartItem",
						id: "updateCartItem",
						onDone: [{ actions: "setCart", target: "cartLoaded" }],
					},
				},
				addingItem: {
					invoke: {
						src: "addItem",
						id: "addItem",
						onDone: [{ actions: "setCart", target: "cartLoaded" }],
					},
					entry: ["setLoading"],
				},
				settingItemLoading: {
					invoke: {
						id: "passItemKey",
						src: "passItemKey",
						onDone: { actions: ["setItemLoading"], target: "updatingCartItem" },
					},
				},
				removingItem: {
					invoke: {
						id: "removeItem",
						src: "removeItem",
						onDone: { actions: "setCart", target: "cartLoaded" },
					},
				},
				cartLoaded: {
					entry: ["setLoaded", "clearItemLoading"],
					on: {
						UPDATEITEM: { target: "settingItemLoading" },
						FETCHCART: { target: "fetchingCart" },
						ADDITEM: { target: "addingItem" },
						REMOVEITEM: { target: "removingItem" },
					},
				},
			},
			schema: {
				services: {} as {
					fetchCart: {
						data: WC_CartType | null
					}
					updateCartItem: {
						data: WC_CartType | null
					}
					addItem: {
						data: WC_CartType | null
					}
					removeItem: {
						data: WC_CartType | null
					}
					passItemKey: {
						data: { itemKey: string; quantity: number }
					}
				},
			},
		},
		{
			actions: {
				setCart: assign((ctx, { data }) => {
					return { ...ctx, cart: data }
				}),
				setLoading: assign((ctx) => ({ ...ctx, loading: true })),
				setLoaded: assign((ctx, event) => ({ ...ctx, loading: false })),
				setItemLoading: assign((ctx, { data: { itemKey, quantity } }) => ({
					...ctx,
					itemLoading: { itemKey, quantity },
				})),
				clearItemLoading: assign((ctx) => ({ ...ctx, itemLoading: null })),
			},
			services: {
				fetchCart: async (ctx) => {
					try {
						const { cart } = await getCart()

						return cart
					} catch (error) {
						return null
					}
				},
				updateCartItem: async (ctx) => {
					const { itemKey, quantity } = ctx.itemLoading

					try {
						const data: API_CartResponseType = await (
							await fetch(CART_ENDPOINT, {
								method: "POST",
								body: JSON.stringify({
									action: "UPDATEITEM",
									itemKey,
									quantity,
								} as WP_API_Cart_UpdateItemInputType),
							})
						).json()

						return data.cart
					} catch (error) {
						return null
					}
				},
				addItem: async (ctx, event: { input: WC_Cart_AddToCartInputType }) => {
					const { input } = event

					try {
						const data: API_CartResponseType = await (
							await fetch(CART_ENDPOINT, {
								method: "POST",
								body: JSON.stringify({
									action: "ADDITEM",
									input,
								} as WP_API_Cart_AddItemInputType),
							})
						).json()

						return data.cart
					} catch (error) {
						return null
					}
				},
				passItemKey: async (ctx, event: { itemKey: string; quantity: number }) => {
					const { itemKey, quantity } = event
					return { itemKey, quantity }
				},
				removeItem: async (ctx, event: { itemKey: string }) => {
					const { itemKey } = event

					try {
						const data: API_CartResponseType = await (
							await fetch(CART_ENDPOINT, {
								method: "POST",
								body: JSON.stringify({
									action: "REMOVEITEM",
									itemKey,
								} as WP_API_Cart_RemoveItemInputType),
							})
						).json()

						return data.cart
					} catch (error) {
						return null
					}
				},
			},
		},
	)
