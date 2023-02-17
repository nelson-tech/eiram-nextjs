import { cookies as nextCookies } from "next/headers"
import { GraphQLClient } from "graphql-request"

import { RefreshAuthTokenDocument } from "@api/codegen/graphql"
import {
  API_URL,
  AUTH_TOKEN_KEY,
  CART_TOKEN_KEY,
  CUSTOMER_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from "@lib/constants"
import type { CLIENT_Tokens_Type } from "@lib/types/auth"
import { isTokenValid } from "./validateToken"

// ####
// #### Function (Can only be called on server)
// ####

const getTokensServer = async (): Promise<{
  tokens: CLIENT_Tokens_Type
  newAuth: boolean
  isAuth: boolean
}> => {
  const cookies = nextCookies().getAll()

  let authToken = cookies.find(
    (cookie) => cookie.name === AUTH_TOKEN_KEY
  )?.value
  let refreshToken = cookies.find(
    (cookie) => cookie.name === REFRESH_TOKEN_KEY
  )?.value
  let customerToken = cookies.find(
    (cookie) => cookie.name === CUSTOMER_TOKEN_KEY
  )?.value
  let cartToken = cookies.find(
    (cookie) => cookie.name === CART_TOKEN_KEY
  )?.value

  let newAuth = false
  let isAuth = false

  // Validate authToken
  if (isTokenValid(authToken)) {
    isAuth = true
  } else if (refreshToken && isTokenValid(refreshToken)) {
    // Try to refresh

    const client = new GraphQLClient(API_URL ?? "")
    const refreshData = await client.request(RefreshAuthTokenDocument, {
      input: { jwtRefreshToken: refreshToken },
    })

    const newAuthToken = refreshData.refreshJwtAuthToken?.authToken

    if (newAuthToken) {
      console.log("New authToken generated")

      newAuth = true
      isAuth = true
      authToken = newAuthToken
    }
  }

  return {
    tokens: {
      auth: authToken,
      refresh: refreshToken,
      customer: customerToken,
      cart: cartToken,
    },
    newAuth,
    isAuth,
  }
}

export default getTokensServer
