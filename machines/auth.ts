import useClient from "@api/client"
import { GetCustomerDataDocument, GetViewerDocument, User } from "@api/codegen/graphql"
import { AuthMachine_Type } from "@lib/types/auth"
import getTokensClient from "@lib/utils/getTokensClient"
import { assign, createMachine } from "xstate"

import type { Typegen0 } from "./auth.typegen"

export const authMachine = (initialState: string) =>
	/** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgOjVsAdugJYDGyJBUAxBAPYFjbEEBudA1k3pgMKZhSXAE6JQABzqxiJBmJAAPRAFYA7AA5s6gCwBGZQCYAnEd0A2M6oDMAGhABPRAFpdB7KpMHtq3etUAGKx0rMwBfULseXAwBIjIKFhowYWE6YWxxABsKADM0gFtorH5BEXlJaVkCeSUEXV0rLSN-M39lNSNVAytAu0cEA2VGqy9dI0srKw9tbWVwyJjsaShGCABJAmoAZTWAcQA5AHkAVQAVcqkZYjkkRURdf0fsI20WowMP-3rrPsQzK2U2FcJm0Blc-jBRis8xAUWWq0OGG2e32a32F0q12qt1qym0mhCJlUFjGZlB6l+CEMZi0oyhgW0ZheBhhcOIK0SG1oDCYLHYXCW7IIGwxVxuoFq6imtOMyjaBi6Y1UlLB2G0U386vGUKM7SMrMW8M5m2SqXSWVyBUFKxFtwqYuxEsQxO0aqhGkMBnU+gpDmcuuwZm66jB6jM3sZynUBqw1oIiUR6G5jGYbE4THhidFVXk-VUXXc7weJma+e0dlqrm62C99KmQY8gRjOCNVET1FNaQy2XQeWEhUzGGzWJq9w+jVrPXrCuatj9CC6ro8YP8Jf8ZfCERABDoEDg8iiPEIJHIlCgw-FdwQemeJfUYZ8crlZmUlJc-kL7xC-nUnSmPTCLc2RWSBbQkS4cxxRAjB0Z5lH+LwzF8KxfF0SldCXR5iQsHQow8VQ5iAw0hUgRNsE4C9HSvDDdCBAj8weMtrBeSkCKMbBAgeIYwSsTxtGbONSIwbAcmQYhMlQYQwEo0c6hvXR6J8ddVG8Xjy3nb1ASmB51EeJlGVcAT4SE9AZKguoFLotQlKYtTKXDGlAlXX96gaf5AIWWNWygMCQHtSCnQQf4PyDBSg2-AF1xVdpsBGPQdB8BTfG6IyhQTIc7QgkdzKhNxjCQ3iAghWdWILZdixMZT+KIrAzMCyySxgh99DaFpX3nFxw0DYMwUse9jHXTdQiAA */
	createMachine(
		{
			tsTypes: {} as import("./auth.typegen").Typegen0,
			context: { tokens: null, user: null, orderCount: 0 } as AuthMachine_Type,
			id: "auth",
			initial: initialState,
			predictableActionArguments: true,
			states: {
				authenticating: {
					invoke: {
						src: "authChecker",
						id: "authChecker",
						onDone: [{ actions: "setToken", target: "loggedIn" }],
						onError: [{ target: "loggedOut" }],
					},
				},
				loggedIn: {
					on: {
						LOGOUT: { target: "loggingOut" },
						AUTHENTICATE: { target: "authenticating" },
					},
				},
				loggedOut: {
					on: {
						LOGIN: {
							target: "loggingIn",
						},
						AUTHENTICATE: {
							target: "authenticating",
						},
					},
				},
				loggingIn: {
					invoke: {
						src: "login",
						id: "login",
						onDone: [{ actions: "setToken", target: "loggedIn" }],
						onError: [{ target: "loggedOut" }],
					},
				},
				loggingOut: {
					invoke: {
						src: "logout",
						id: "logout",
						onDone: [{ actions: "setToken", target: "loggedOut" }],
						onError: [{ target: "loggedOut" }],
					},
				},
			},
			schema: {
				services: {} as {
					authChecker: {
						data: AuthMachine_Type
					}
					login: {
						data: AuthMachine_Type
					}
					logout: {
						data: AuthMachine_Type
					}
				},
			},
		},
		{
			actions: {
				setToken: assign((ctx, { data }) => {
					if (data.tokens?.auth) {
						return { ...ctx, tokens: data.tokens, user: data.user, orderCount: data.orderCount }
					}
					return { ...ctx }
				}),
			},
			services: {
				authChecker: async (ctx) => {
					// Check for stored auth first
					const { tokens, isAuth } = await getTokensClient()

					if (isAuth) {
						// Token is stored. Fetch user data
						const client = useClient(tokens)
						const user = await client.request(GetViewerDocument)
						const customerData = await client.request(GetCustomerDataDocument)

						return {
							tokens,
							user: user.viewer as User,
							orderCount: customerData.customer.orderCount,
						}
					}

					throw new Error("Unauthorized")
				},
				login: async (
					_,
					event: {
						input: AuthMachine_Type
					},
				) => {
					return event.input
				},
				logout: async () => {
					return { tokens: null, user: null }
				},
			},
		},
	)
