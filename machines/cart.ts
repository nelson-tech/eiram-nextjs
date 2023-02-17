import { assign, createMachine } from "xstate"

import getClient from "@api/client"
import {
  AddToCartDocument,
  Cart,
  ClearCartDocument,
  GetCartDocument,
  RemoveCartItemDocument,
  RemoveItemsFromCartInput,
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
        updateLoading: null as { itemKey: string; quantity: number } | null,
        removeLoading: null as { itemKey: string } | null,
      },
      predictableActionArguments: true,
      states: {
        fetchingCart: {
          invoke: {
            src: "fetchCart",
            id: "fetchCart",
            onDone: [{ actions: "setCart", target: "cartLoaded" }],
            onError: [{ target: "cartLoaded" }],
          },
          entry: ["setLoading"],
        },
        addingItem: {
          invoke: {
            src: "addItem",
            id: "addItem",
            onDone: [{ actions: "setCart", target: "cartLoaded" }],
            onError: [{ target: "fetchingCart" }],
          },
          entry: ["setLoading"],
        },
        settingUpdateLoading: {
          invoke: {
            id: "passUpdateKey",
            src: "passUpdateKey",
            onDone: {
              actions: ["setUpdateLoading"],
              target: "updatingCartItem",
            },
            onError: [{ target: "fetchingCart" }],
          },
        },
        updatingCartItem: {
          invoke: {
            src: "updateCartItem",
            id: "updateCartItem",
            onDone: [
              {
                actions: ["clearUpdateLoading", "setCart"],
                target: "cartLoaded",
              },
            ],
            onError: [{ target: "fetchingCart" }],
          },
        },
        settingRemoveLoading: {
          invoke: {
            id: "passRemoveKey",
            src: "passRemoveKey",
            onDone: { actions: ["setRemoveLoading"], target: "removingItem" },
            onError: [{ target: "fetchingCart" }],
          },
        },
        removingItem: {
          invoke: {
            id: "removeItem",
            src: "removeItem",
            onDone: [
              {
                actions: ["clearRemoveLoading", "setCart"],
                target: "cartLoaded",
              },
            ],
            onError: [{ target: "fetchingCart" }],
          },
        },
        clearingCart: {
          invoke: {
            id: "clearCart",
            src: "clearCart",
            onDone: [{ actions: "setCart", target: "cartLoaded" }],
            onError: [{ target: "fetchingCart" }],
          },
          entry: ["setLoading"],
        },
        cartLoaded: {
          entry: ["setLoaded"],
          on: {
            FETCHCART: { target: "fetchingCart" },
            ADDITEM: { target: "addingItem" },
            UPDATEITEM: { target: "settingUpdateLoading" },
            REMOVEITEM: { target: "settingRemoveLoading" },
            CLEARCART: { target: "clearingCart" },
          },
        },
      },
      schema: {
        services: {} as {
          fetchCart: {
            data: Cart | null
          }
          addItem: { data: Cart | null }
          passUpdateKey: {
            data: { input: UpdateItemQuantitiesInput }
          }
          updateCartItem: { data: Cart | null }
          passRemoveKey: {
            data: { input: RemoveItemsFromCartInput }
          }
          removeItem: { data: Cart | null }
          clearCart: { data: Cart | null }
        },
      },
    },
    {
      actions: {
        setCart: assign((ctx, { data }) => {
          return { ...ctx, cart: data }
        }),
        setLoading: assign((ctx) => ({ ...ctx, loading: true })),
        setLoaded: assign((ctx) => ({ ...ctx, loading: false })),
        setUpdateLoading: assign((ctx, { data: { input } }) => {
          // const { key, quantity } = input.items[0]
          const key = input.items ? input.items[0]?.key : null
          const quantity = input.items ? input.items[0]?.quantity : null
          if (key && quantity)
            return {
              ...ctx,
              updateLoading: { itemKey: key, quantity },
            }
          return ctx
        }),
        clearUpdateLoading: assign((ctx) => ({ ...ctx, updateLoading: null })),
        setRemoveLoading: assign((ctx, { data: { input } }) => {
          const key = input.keys ? input.keys[0] : null
          if (key)
            return {
              ...ctx,
              removeLoading: { itemKey: key },
            }
          return ctx
        }),
        clearRemoveLoading: assign((ctx) => ({ ...ctx, removeLoading: null })),
      },
      services: {
        fetchCart: async (ctx) => {
          const client = getClient()
          const cartData = await client.request(GetCartDocument)

          return cartData.cart as Cart
        },
        addItem: async (ctx, event: AddToCartEventType) => {
          const { input } = event

          const client = getClient()

          const cartData = await client.request(AddToCartDocument, { input })

          event.callback && (await event.callback())

          return cartData.addToCart?.cart
            ? (cartData.addToCart.cart as Cart)
            : null
        },
        passUpdateKey: async (ctx, event: UpdateCartItemEventType) => {
          return { input: event.input }
        },
        updateCartItem: async (ctx) => {
          if (ctx.updateLoading) {
            const { itemKey, quantity } = ctx.updateLoading

            const client = getClient()

            const updateCartData = await client.request(
              UpdateCartItemQuantityDocument,
              {
                input: { items: [{ key: itemKey, quantity }] },
              }
            )

            return updateCartData.updateItemQuantities?.cart
              ? (updateCartData.updateItemQuantities.cart as Cart)
              : null
          }
          return null
        },
        passRemoveKey: async (ctx, event: RemoveCartItemEventType) => {
          return { input: event.input }
        },
        removeItem: async (ctx) => {
          if (ctx.removeLoading) {
            const client = getClient()

            const removeItemData = await client.request(
              RemoveCartItemDocument,
              {
                input: { keys: [ctx.removeLoading.itemKey] },
              }
            )

            return removeItemData.removeItemsFromCart?.cart
              ? (removeItemData.removeItemsFromCart.cart as Cart)
              : null
          }
          return null
        },
        clearCart: async () => {
          const client = getClient()

          const clearCartData = await client.request(ClearCartDocument)
          return clearCartData.emptyCart?.cart
            ? (clearCartData.emptyCart.cart as Cart)
            : null
        },
      },
    }
  )
