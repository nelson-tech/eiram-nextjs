import jwt_encode from "jwt-encode"

const encodeToken = (payload: Object) => {
	const token: string = jwt_encode(payload, "customer")

	return token
}

export default encodeToken
