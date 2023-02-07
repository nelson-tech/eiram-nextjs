"use client"

import { GraphQLClient } from "graphql-request"
import { getCookie, getCookies } from "cookies-next"

import { RefreshAuthTokenDocument } from "@api/codegen/graphql"
import { API_URL, AUTH_TOKEN_KEY, CART_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@lib/constants"
import type { CLIENT_Tokens_Type } from "@lib/types/auth"
import { isTokenValid } from "./validateToken"
import isServer from "./isServer"
import setCookie from "./setCookie"

// ####
// #### Function (Can only be called on server)
// ####

const getTokensClient = async (): Promise<{
	tokens: CLIENT_Tokens_Type
	isAuth: boolean
}> => {
	const cookies = getCookies()
	let authToken = cookies[AUTH_TOKEN_KEY]
	let refreshToken = cookies[REFRESH_TOKEN_KEY]
	let cartToken = cookies[CART_TOKEN_KEY]

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

			isAuth = true
			authToken = newAuthToken

			!isServer && setCookie(AUTH_TOKEN_KEY, newAuthToken)
		}
	}

	return {
		tokens: {
			auth: authToken,
			refresh: refreshToken,
			cart: cartToken,
		},
		isAuth,
	}
}

export default getTokensClient
