import { GetCartQuery, GetViewerQuery, User } from "@lib/api/codegen/graphql"

export type Layout_AuthData_Type = {
	tokens: CLIENT_Tokens_Type
	newAuth: boolean
	isAuth: boolean
	user: GetViewerQuery["viewer"] | null
	cart?: GetCartQuery["cart"]
}

export type CLIENT_Tokens_Type = {
	auth: string | null | undefined
	refresh: string | null | undefined
	cart: string | null | undefined
}

export type AuthMachine_Type = {
	tokens: CLIENT_Tokens_Type
	user: User | null
	orderCount?: number
}
