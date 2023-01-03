import { cookies as nextCookies } from "next/headers"

import {
	AUTH_TOKEN_KEY,
	CART_NONCE_KEY,
	CART_TOKEN_KEY,
	REFRESH_TOKEN_KEY,
	USER_TOKEN_KEY,
} from "@lib/constants"

const getTokens = (): { tokens: WP_AuthTokensType } => {
	const cookies = nextCookies()

	const authToken = cookies.get(AUTH_TOKEN_KEY)?.value
	const refreshToken = cookies.get(REFRESH_TOKEN_KEY)?.value
	const nonce = cookies.get(CART_NONCE_KEY)?.value
	const cartToken = cookies.get(CART_TOKEN_KEY)?.value
	const userToken = cookies.get(USER_TOKEN_KEY)?.value

	return {
		tokens: { auth: authToken, refresh: refreshToken, cart: cartToken, nonce, user: userToken },
	}
}

export default getTokens
