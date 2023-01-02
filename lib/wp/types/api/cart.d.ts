type WP_API_Cart_FetchInputType = {
	action: "FETCH"
}

type WP_API_Cart_UpdateItemInputType = {
	action: "UPDATEITEM"
	itemKey: string
	quantity: number
}

type WP_API_Cart_RemoveItemInputType = {
	action: "REMOVEITEM"
	itemKey: string
}

type WP_API_Cart_AddItemInputType = {
	action: "ADDITEM"
	input: WC_Cart_AddToCartInputType
}

type WC_API_Cart_CheckoutInputType = {
	action: "CHECKOUT"
	input: WC_CheckoutInputType
}

type WC_CartEndpointInputType = (
	| WP_API_Cart_FetchInputType
	| WP_API_Cart_UpdateItemInputType
	| WP_API_Cart_RemoveItemInputType
	| WP_API_Cart_AddItemInputType
	| WC_API_Cart_CheckoutInputType
) & {
	tokens?: WP_AuthTokensType
}

type API_CartResponseType = {
	authData: API_AuthCheckResultType
	cart?: WC_CartType | null
	checkout?: WC_CheckoutResponseType
}
