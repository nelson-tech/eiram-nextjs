type WP_AUTH_UserDataType = {
	id: number
	email: string
	nicename: string
	firstName: string
	lastName: string
	displayName: string
}

type CLIENT_UserDataType = WP_AUTH_UserDataType & {
	orderCount: number
	openOrders: WC_Order[]
}
