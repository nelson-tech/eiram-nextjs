import jwt_encode from "jwt-encode"

const encodeToken = (payload: Object | null | undefined) => {
	if (payload) {
		const token: string = jwt_encode(payload, "customer")

		return token
	}
	return null
}

export default encodeToken
