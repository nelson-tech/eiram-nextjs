const parseUserToken = (userToken: string | null | undefined) => {
	let userData: WP_AUTH_UserDataType | null = null
	if (userToken) {
		userData = JSON.parse(userToken)
	}

	return userData
}

export default parseUserToken
