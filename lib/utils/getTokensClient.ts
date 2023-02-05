"use client"

import { GraphQLClient } from "graphql-request"

import { RefreshAuthTokenDocument } from "@api/codegen/graphql"
import { API_URL, AUTH_TOKEN_KEY, CART_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@lib/constants"
import type { CLIENT_Tokens_Type } from "@lib/types/auth"
import { isTokenValid } from "./validateToken"
import isServer from "./isServer"
import { getCookie } from "cookies-next"
import setCookie from "./setCookie"

// ####
// #### Function (Can only be called on server)
// ####

const getTokensClient = async (): Promise<{
	tokens: CLIENT_Tokens_Type
	newAuth: boolean
	isAuth: boolean
}> => {
	let authToken = getCookie(AUTH_TOKEN_KEY)?.valueOf() as string
	let refreshToken = getCookie(REFRESH_TOKEN_KEY)?.valueOf() as string
	let cartToken = getCookie(CART_TOKEN_KEY)?.valueOf() as string

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

			!isServer && setCookie(AUTH_TOKEN_KEY, newAuthToken)
		}
	}

	return {
		tokens: {
			auth: authToken,
			refresh: refreshToken,
			cart: cartToken,
		},
		newAuth,
		isAuth,
	}
}

export default getTokensClient
