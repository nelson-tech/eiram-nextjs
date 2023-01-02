import { AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY, REST_AUTH_URI, USER_TOKEN_KEY } from "@lib/constants"

type LoginOrRefreshInputType = {
	loginInput?: WP_AUTH_LoginInputType
	tokens: WP_AuthTokensType
}
const loginOrRefresh = async ({
	loginInput,
	tokens,
}: LoginOrRefreshInputType): Promise<API_AuthCheckResultType> => {
	// Init variables for response
	const newCookies: string[] = []
	let user: WP_AUTH_UserDataType = null
	let isAuth = false

	const input = loginInput ? { ...loginInput } : {}

	const headers = { "content-type": "application/json" }

	tokens.auth && (headers["Authorization"] = `Bearer ${tokens.auth}`)
	tokens.refresh && (input[REFRESH_TOKEN_KEY] = tokens.refresh)

	// Auth REST route will check for refresh token first.
	// If found, it will return an authToken

	// If not found, it will look for username/password
	// If login is successfull, a refresh cookie is sent in headers and authToken in body
	const loginResponse = await fetch(REST_AUTH_URI, {
		method: "POST",
		credentials: "include",
		headers,
		body: JSON.stringify(input),
	}).catch((e) => {
		console.warn("ERROR", e)
	})

	if (loginResponse) {
		// Look for refresh token in headers
		const cookieToSet = (loginResponse.headers.get("set-cookie") ?? "").replace(
			"refresh_token",
			REFRESH_TOKEN_KEY,
		)

		cookieToSet && newCookies.push(cookieToSet)

		const loginData: WP_AUTH_LoginResponseType = await loginResponse.json()

		// Set user (without token) if retrieved
		if (loginData?.data?.id) {
			const { token, ...retrievedUser } = loginData.data
			user = retrievedUser
			newCookies.push(
				`${USER_TOKEN_KEY}=${JSON.stringify(
					retrievedUser,
				)}; HttpOnly; Path=/; SameSite=None; Secure; expires=${new Date(
					Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
				).toUTCString()}`,
			)
		}

		// Set new authToken if retrieved
		const newAuthToken = loginData?.data?.token ? loginData.data.token : null
		if (newAuthToken) {
			tokens.auth = newAuthToken

			newCookies.push(
				`${AUTH_TOKEN_KEY}=${newAuthToken}; HttpOnly; Path=/; SameSite=None; Secure; expires=${new Date(
					Date.now() + 10 * 60 * 1000, // 10 minutes
				).toUTCString()}`,
			)

			isAuth = true
		}
	}
	return { isAuth, newCookies, user, tokens }
}

export default loginOrRefresh
