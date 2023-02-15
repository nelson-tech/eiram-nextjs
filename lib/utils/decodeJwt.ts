import { Customer } from "@api/codegen/graphql"
import jwt_decode from "jwt-decode"

type JWToken = {
	iss: string
	iat: number
	nbf: number
	exp: number
	data: {
		user: {
			id: string
		}
	}
}

export const decodeToken = (token: string) => {
	const tokenData = jwt_decode<JWToken>(token || "")

	return tokenData
}

export const decodeCustomerToken = (token: string | null | undefined) => {
	if (token) {
		const customerData = jwt_decode<Customer>(token || "")

		return customerData
	}
	return null
}
