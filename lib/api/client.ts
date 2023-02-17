import { GraphQLClient } from "graphql-request"
import { getCookie } from "cookies-next"

import {
  API_URL,
  AUTH_TOKEN_KEY,
  CART_SESSION_HEADER_KEY,
  CART_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from "@lib/constants"
import type { CLIENT_Tokens_Type } from "@lib/types/auth"
import isServer from "@lib/utils/isServer"
import setCookie from "@lib/utils/setCookie"
import { isTokenValid } from "@lib/utils/validateToken"
import { RefreshAuthTokenDocument } from "./codegen/graphql"

// ####
// #### Variables
// ####

let graphqlClient: GraphQLClient | null = null

// ####
// #### Middleware
// ####

const requestMiddleware = async (request: any) => {
  // Strip authorization unless required
  const { auth, ...headers } = request.headers

  // Check if authToken needs refreshing
  if (!isServer) {
    const currentAuth = headers["Authorization"]
    if (currentAuth) {
      const authIsValid = isTokenValid(currentAuth.split(" ")[1])
      if (!authIsValid) {
        const refreshToken = getCookie(REFRESH_TOKEN_KEY)?.valueOf()
        if (refreshToken) {
          const refreshData = await graphqlClient?.request(
            RefreshAuthTokenDocument,
            {
              input: { jwtRefreshToken: refreshToken as string },
            }
          )
          const newAuth = refreshData?.refreshJwtAuthToken?.authToken
          if (newAuth) {
            console.log("Auth token has been refreshed by API Client")

            headers["Authorization"] = `Bearer ${newAuth}`
            setCookie(AUTH_TOKEN_KEY, newAuth)
            graphqlClient?.setHeader("Authorization", `Bearer ${newAuth}`)
          }
        }
      }
    }
  }

  return { ...request, headers }
}

const responseMiddleware = async (response: any) => {
  const session = response?.headers?.get(CART_SESSION_HEADER_KEY)

  if (!isServer && session) {
    const oldSession = getCookie(CART_TOKEN_KEY)?.valueOf()

    session != oldSession && setCookie(CART_TOKEN_KEY, session)
    graphqlClient?.setHeader(CART_SESSION_HEADER_KEY, `Session ${session}`)
  }

  if (response.errors) {
    const traceId = response.headers.get("x-b3-traceid") || "unknown"
    console.error(
      `[${traceId}] Request error:
        status ${response.status}
        details: ${response.errors}`
    )
  }
}

// ####
// #### Hook
// ####

const getClient = (tokens?: CLIENT_Tokens_Type) => {
  if (!graphqlClient) {
    // Create new, unauthenticated client

    graphqlClient = new GraphQLClient(API_URL as string, {
      requestMiddleware,
      responseMiddleware,
    })
  }

  if (tokens) {
    // Set auth headers if present
    const headers: { [key: string]: string } = {}

    tokens?.auth && (headers["Authorization"] = `Bearer ${tokens.auth}`)

    if (!isServer) {
      const session = getCookie(CART_TOKEN_KEY)?.valueOf()

      session && (headers[CART_SESSION_HEADER_KEY] = `Session ${session}`)
    } else {
      tokens?.cart &&
        (headers[CART_SESSION_HEADER_KEY] = `Session ${tokens.cart}`)
    }

    graphqlClient.setHeaders(headers)
  }

  return graphqlClient
}

export default getClient
