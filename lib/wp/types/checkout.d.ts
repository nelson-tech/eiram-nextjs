type WC_CheckoutResponseType = {
	order_id: number
	status: string
	order_key: string
	customer_note: string
	customer_id: 1
	billing_address: {
		first_name: string
		last_name: string
		company: string
		address_1: string
		address_2: string
		city: string
		state: string
		postcode: string
		country: string
		email: string
		phone: string
	}
	shipping_address: {
		first_name: string
		last_name: string
		company: string
		address_1: string
		address_2: string
		city: string
		state: string
		postcode: string
		country: string
	}
	payment_method: string
	payment_result: {
		payment_status: string
		payment_details: []
		redirect_url: string
	}
}

type WC_CheckoutInputType = {
	billing_address: WC_CheckoutResponseType["billing_address"]
	shipping_address: WC_CheckoutResponseType["shipping_address"]
	customer_note?: string
	payment_method: string
	payment_data?: { key: string; value: string }[]
}
