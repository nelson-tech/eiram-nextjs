import { assign, createMachine } from "xstate"

import useClient from "@api/client"
import {
	AddToCartDocument,
	Cart,
	GetCartDocument,
	RemoveCartItemDocument,
	UpdateCartItemQuantityDocument,
	UpdateItemQuantitiesInput,
} from "@api/codegen/graphql"

import type { Typegen0 } from "./cart.typegen"
import {
	AddToCartEventType,
	RemoveCartItemEventType,
	UpdateCartItemEventType,
} from "@lib/types/cart"

export const cartMachine =
	/** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgOjVsAdugJYDGyJBUAxBAPYFjbEEBudA1k3pgMKZhSXAE6JQABzqxiJBmJAAPRAFYA7AA5s6gCwBGZQCYAnEd0A2M6oDMAGhABPRAFpdB7KpMHtq3etUAGKx0rMwBfULseXAwBIjIKFhowYWE6YWxxABsKADM0gFtorH5BEXlJaVkCeSUEXV0rLSN-M39lNSNVAytAu0cEA2VGqy9dI0srKw9tbWVwyJjsaShGCABJAmoAZTWAcQA5AHkAVQAVcqkZYjkkRURdf0fsI20WowMP-3rrPsQzK2U2FcJm0Blc-jBRis8xAUWWq0OGG2e32a32F0q12qt1qym0mhCJlUFjGZlB6l+CEMZi0oyhgW0ZheBhhcOIK0SG1oDCYLHYXCW7IIGwxVxuoFq6imtOMyjaBi6Y1UlLB2G0U386vGUKM7SMrMW8M5m2SqXSWVyBUFKxFtwqYuxEsQxO0aqhGkMBnU+gpDmcuuwZm66jB6jM3sZynUBqw1oIiUR6G5jGYbE4THhidFVXk-VUXXc7weJma+e0dlqrm62C99KmQY8gRjOCNVET1FNaQy2XQeWEhUzGGzWJq9w+jVrPXrCuatj9CC6ro8YP8Jf8ZfCERABDoEDg8iiPEIJHIlCgw-FdwQemeJfUYZ8crlZmUlJc-kL7xC-nUnSmPTCLc2RWSBbQkS4cxxRAjB0Z5lH+LwzF8KxfF0SldCXR5iQsHQow8VQ5iAw0hUgRNsE4C9HSvDDdCBAj8weMtrBeSkCKMbBAgeIYwSsTxtGbONSIwbAcmQYhMlQYQwEo0c6hvXR6J8ddVG8Xjy3nb1ASmB51EeJlGVcAT4SE9AZKguoFLotQlKYtTKXDGlAlXX96gaf5AIWWNWygMCQHtSCnQQf4PyDBSg2-AF1xVdpsBGPQdB8BTfG6IyhQTIc7QgkdzKhNxjCQ3iAghWdWILZdixMZT+KIrAzMCyySxgh99DaFpX3nFxw0DYMwUse9jHXTdQiAA */
	createMachine(
		{
			tsTypes: {} as import("./cart.typegen").Typegen0,
			id: "cart",
			initial: "cartLoaded",
			context: {
				cart: null as Cart | null | undefined,
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
				settingItemLoading: {
					invoke: {
						id: "passItemKey",
						src: "passItemKey",
						onDone: { actions: ["setItemLoading"], target: "updatingCartItem" },
					},
				},
				updatingCartItem: {
					invoke: {
						src: "updateCartItem",
						id: "updateCartItem",
						onDone: [{ target: "fetchingCart" }],
					},
				},
				addingItem: {
					invoke: {
						src: "addItem",
						id: "addItem",
						onDone: [{ target: "fetchingCart" }],
					},
					entry: ["setLoading"],
				},
				removingItem: {
					invoke: {
						id: "removeItem",
						src: "removeItem",
						onDone: { target: "fetchingCart" },
					},
					entry: ["setLoading"],
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
						data: Cart | null
					}
					updateCartItem: { data: void }
					addItem: { data: void }
					removeItem: { data: void }
					passItemKey: {
						data: { input: UpdateItemQuantitiesInput }
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
				setItemLoading: assign((ctx, { data: { input } }) => {
					const { key, quantity } = input.items[0]
					return {
						...ctx,
						itemLoading: { itemKey: key, quantity },
					}
				}),
				clearItemLoading: assign((ctx) => ({ ...ctx, itemLoading: null })),
			},
			services: {
				fetchCart: async (ctx) => {
					const client = useClient()
					const cartData = await client.request(GetCartDocument)

					return cartData.cart as Cart
				},
				updateCartItem: async (ctx) => {
					const { itemKey, quantity } = ctx.itemLoading

					const client = useClient()

					const updateCartData = await client.request(UpdateCartItemQuantityDocument, {
						input: { items: [{ key: itemKey, quantity }] },
					})
				},
				addItem: async (ctx, event: AddToCartEventType) => {
					const { input } = event

					const client = useClient()

					const cartData = await client.request(AddToCartDocument, { input })

					event.callback && (await event.callback())
				},
				passItemKey: async (ctx, event: UpdateCartItemEventType) => {
					return { input: event.input }
				},
				removeItem: async (ctx, event: RemoveCartItemEventType) => {
					const { input } = event

					const client = useClient()

					const removeItemData = await client.request(RemoveCartItemDocument, { input })
				},
			},
		},
	)
