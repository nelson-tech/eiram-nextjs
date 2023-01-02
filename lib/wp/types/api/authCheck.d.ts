type API_AuthCheckResultType = {
	isAuth: boolean
	newCookies: string[]
	user: WP_AUTH_UserDataType
	tokens: WP_AuthTokensType
}
