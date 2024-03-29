import { assign, createMachine } from "xstate"
import { deleteCookie, getCookie } from "cookies-next"

import getClient from "@api/client"
import type { Customer, User } from "@api/codegen/graphql"
import {
  GetCustomerDataDocument,
  LoginUserDocument,
  LogoutUserDocument,
  RegisterCustomerDocument,
  ResetUserPasswordDocument,
  SendPasswordResetEmailDocument,
} from "@api/codegen/graphql"
import type {
  AuthLoginEvent_Type,
  AuthLogoutEvent_Type,
  AuthMachine_Type,
  AuthRegisterEvent_Type,
  AuthResetPasswordEvent_Type,
  AuthSendResetEmailEvent_Type,
  AuthUpdateCustomerEvent_Type,
} from "@lib/types/auth"
import { decodeCustomerToken } from "@lib/utils/decodeJwt"
import encodeToken from "@lib/utils/encodeJwt"
import getTokensClient from "@lib/utils/getTokensClient"
import setCookie from "@lib/utils/setCookie"
import {
  AUTH_TOKEN_KEY,
  CUSTOMER_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from "@lib/constants"

import type { Typegen0 } from "./auth.typegen"

export const authMachine = (initialState: string) =>
  /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgOjVsAdugJYDGyJBUAxBAPYFjbEEBudA1k3pgMKZhSXAE6JQABzqxiJBmJAAPRAFYA7AA5s6gCwBGZQCYAnEd0A2M6oDMAGhABPRAFpdB7KpMHtq3etUAGKx0rMwBfULseXAwBIjIKFhowYWE6YWxxABsKADM0gFtorH5BEXlJaVkCeSUEXV0rLSN-M39lNSNVAytAu0cEA2VGqy9dI0srKw9tbWVwyJjsaShGCABJAmoAZTWAcQA5AHkAVQAVcqkZYjkkRURdf0fsI20WowMP-3rrPsQzK2U2FcJm0Blc-jBRis8xAUWWq0OGG2e32a32F0q12qt1qym0mhCJlUFjGZlB6l+CEMZi0oyhgW0ZheBhhcOIK0SG1oDCYLHYXCW7IIGwxVxuoFq6imtOMyjaBi6Y1UlLB2G0U386vGUKM7SMrMW8M5m2SqXSWVyBUFKxFtwqYuxEsQxO0aqhGkMBnU+gpDmcuuwZm66jB6jM3sZynUBqw1oIiUR6G5jGYbE4THhidFVXk-VUXXc7weJma+e0dlqrm62C99KmQY8gRjOCNVET1FNaQy2XQeWEhUzGGzWJq9w+jVrPXrCuatj9CC6ro8YP8Jf8ZfCERABDoEDg8iiPEIJHIlCgw-FdwQemeJfUYZ8crlZmUlJc-kL7xC-nUnSmPTCLc2RWSBbQkS4cxxRAjB0Z5lH+LwzF8KxfF0SldCXR5iQsHQow8VQ5iAw0hUgRNsE4C9HSvDDdCBAj8weMtrBeSkCKMbBAgeIYwSsTxtGbONSIwbAcmQYhMlQYQwEo0c6hvXR6J8ddVG8Xjy3nb1ASmB51EeJlGVcAT4SE9AZKguoFLotQlKYtTKXDGlAlXX96gaf5AIWWNWygMCQHtSCnQQf4PyDBSg2-AF1xVdpsBGPQdB8BTfG6IyhQTIc7QgkdzKhNxjCQ3iAghWdWILZdixMZT+KIrAzMCyySxgh99DaFpX3nFxw0DYMwUse9jHXTdQiAA */
  createMachine(
    {
      tsTypes: {} as import("./auth.typegen").Typegen0,
      context: { tokens: null, customer: null } as AuthMachine_Type,
      id: "auth",
      initial: initialState,
      predictableActionArguments: true,
      states: {
        authenticating: {
          invoke: {
            src: "authChecker",
            id: "authChecker",
            onDone: [{ actions: "setState", target: "loggedIn" }],
            onError: [{ target: "loggedOut" }],
          },
        },
        loggedIn: {
          on: {
            LOGOUT: { target: "loggingOut" },
            AUTHENTICATE: { target: "authenticating" },
            SENDRESETEMAIL: {
              target: "sendingResetEmail",
            },
            RESETPASSWORD: {
              target: "resettingPassword",
            },
            UPDATECUSTOMER: {
              target: "updatingCustomer",
            },
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
            REGISTER: {
              target: "registering",
            },
            SENDRESETEMAIL: {
              target: "sendingResetEmail",
            },
            RESETPASSWORD: {
              target: "resettingPassword",
            },
          },
        },
        loggingIn: {
          invoke: {
            src: "login",
            id: "login",
            onDone: [{ actions: "setState", target: "loggedIn" }],
            onError: [{ target: "loggedOut" }],
          },
        },
        loggingOut: {
          invoke: {
            src: "logout",
            id: "logout",
            onDone: [{ actions: "setState", target: "loggedOut" }],
            onError: [{ target: "loggedOut" }],
          },
        },
        registering: {
          invoke: {
            src: "register",
            id: "register",
            onDone: [{ actions: "setState", target: "loggedIn" }],
            onError: [{ target: "loggedOut" }],
          },
        },
        sendingResetEmail: {
          invoke: {
            src: "sendResetEmail",
            id: "sendResetEmail",
            onDone: [{ target: "loggedOut" }],
            onError: [{ target: "loggedOut" }],
          },
        },
        resettingPassword: {
          invoke: {
            src: "resetPassword",
            id: "resetPassword",
            onDone: [{ actions: "setState", target: "loggedIn" }],
            onError: [{ target: "loggedOut" }],
          },
        },
        updatingCustomer: {
          invoke: {
            src: "updateCustomer",
            id: "updateCustomer",
            onDone: [{ actions: "setCustomer", target: "loggedIn" }],
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
          register: {
            data: AuthMachine_Type
          }
          resetPassword: {
            data: AuthMachine_Type
          }
          updateCustomer: {
            data: Customer
          }
        },
      },
    },
    {
      actions: {
        setState: assign((ctx, { data }) => ({ ...ctx, ...data })),
        setCustomer: assign((ctx, { data }) => ({ ...ctx, customer: data })),
      },
      services: {
        authChecker: async () => {
          // Check for stored auth first
          const { tokens, isAuth } = await getTokensClient()

          if (isAuth) {
            // Tokens are stored.

            return {
              tokens,
              customer: decodeCustomerToken(tokens?.customer),
            }
          }

          throw new Error("Unauthorized")
        },
        login: async (_, event: AuthLoginEvent_Type) => {
          const client = getClient()
          const loginData = await client
            .request(LoginUserDocument, { input: event.input })
            .catch((error) => {})

          if (loginData) {
            // Login mutation responded
            const login = loginData.login

            if (login?.authToken && login.refreshToken) {
              const { authToken, refreshToken, customer } = login

              // Set authToken in client
              client.setHeader("Authorization", `Bearer ${authToken}`)

              // Encode customer into token
              const customerToken = encodeToken(customer)

              // Set cookies
              setCookie(AUTH_TOKEN_KEY, authToken)
              setCookie(REFRESH_TOKEN_KEY, refreshToken)
              // Set customer token's expiration to same as refreshToken
              setCookie(CUSTOMER_TOKEN_KEY, customerToken, {}, refreshToken)

              event.callback &&
                (await event.callback(true, customer?.firstName))

              const authData: AuthMachine_Type = {
                tokens: {
                  auth: authToken,
                  refresh: refreshToken,
                  cart: customer?.sessionToken,
                  customer: customerToken,
                },
                customer: customer as Customer,
              }

              return authData
            }
          }

          // Login mutation failed
          event.callback && event.callback(false, null)

          return { tokens: null, customer: null }
        },
        logout: async (_, event: AuthLogoutEvent_Type) => {
          const client = getClient()

          const logoutData = await client.request(LogoutUserDocument, {
            input: {},
          })

          // Delete cookies
          deleteCookie(AUTH_TOKEN_KEY)
          deleteCookie(REFRESH_TOKEN_KEY)
          deleteCookie(CUSTOMER_TOKEN_KEY)

          event.callback &&
            event.callback(logoutData.logout?.status === "SUCCESS")

          return { tokens: null, customer: null }
        },
        register: async (_, event: AuthRegisterEvent_Type) => {
          const client = getClient()

          const registerData = await client.request(RegisterCustomerDocument, {
            input: event.input,
          })
          const newCustomer = registerData?.registerCustomer

          if (newCustomer) {
            // Registration was successfull
            const { authToken, refreshToken, customer } = newCustomer

            // Encode customer into token
            const customerToken = encodeToken(customer)

            // Set cookies
            setCookie(AUTH_TOKEN_KEY, authToken)
            setCookie(REFRESH_TOKEN_KEY, refreshToken)
            // Set customer token's expiration to same as refreshToken
            setCookie(CUSTOMER_TOKEN_KEY, customerToken, {}, refreshToken)

            event.callback && event.callback(true, customer?.firstName)

            const authData: AuthMachine_Type = {
              tokens: {
                auth: authToken,
                refresh: refreshToken,
                customer: customerToken,
                cart: customer?.sessionToken,
              },
              customer: customer as Customer,
            }

            return authData
          }

          return { tokens: null, customer: null }
        },
        sendResetEmail: async (_, event: AuthSendResetEmailEvent_Type) => {
          const client = getClient()

          const resetData = await client.request(
            SendPasswordResetEmailDocument,
            event.input
          )

          event.callback &&
            event.callback(resetData.sendPasswordResetEmail?.success === true)
        },
        resetPassword: async (_, event: AuthResetPasswordEvent_Type) => {
          const client = getClient()

          const { key, login, password } = event.input

          if (key && login && password) {
            const resetData = await client
              .request(ResetUserPasswordDocument, { key, login, password })
              .catch((errors) => {
                const message = `Error: ${errors.message}`
              })

            const user =
              (resetData && (resetData.resetUserPassword?.user as User)) || null

            if (user) {
              const { jwtAuthToken, jwtRefreshToken } = user

              // Get customer data
              const customerData = await client.request(GetCustomerDataDocument)

              // Encode customer into token
              const customerToken = encodeToken(customerData.customer)

              // Set cookies
              setCookie(AUTH_TOKEN_KEY, jwtAuthToken)
              setCookie(REFRESH_TOKEN_KEY, jwtRefreshToken)
              // Set customer token's expiration to same as refreshToken
              setCookie(CUSTOMER_TOKEN_KEY, customerToken, {}, jwtRefreshToken)

              event.callback &&
                event.callback(true, customerData?.customer?.firstName)

              const authData: AuthMachine_Type = {
                tokens: {
                  auth: jwtAuthToken,
                  refresh: jwtRefreshToken,
                  customer: customerToken,
                  cart: customerData.customer?.sessionToken,
                },
                customer: customerData.customer as Customer,
              }

              return authData
            }
          }
          return { tokens: null, customer: null }
        },
        updateCustomer: async (
          _,
          { customer }: AuthUpdateCustomerEvent_Type
        ) => {
          // Get refreshToken (for expiration date)
          const refreshToken = getCookie(REFRESH_TOKEN_KEY)?.valueOf()

          // Encode customer into token
          const customerToken = encodeToken(customer)

          setCookie(
            CUSTOMER_TOKEN_KEY,
            customerToken,
            {},
            refreshToken as string
          )

          return customer
        },
      },
    }
  )
