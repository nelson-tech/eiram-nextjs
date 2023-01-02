import { CART_ENDPOINT } from "@lib/constants"

const getCart = async (tokens?: WP_AuthTokensType) => {
	const cartRequestBody: WC_CartEndpointInputType = {
		action: "FETCH",
	}

	tokens && (cartRequestBody.tokens = tokens)

	const cartResponse = await fetch(CART_ENDPOINT, {
		method: "POST",
		body: JSON.stringify(cartRequestBody),
	})

	const cartData: API_CartResponseType = await cartResponse.json()

	return cartData
}

export default getCart
