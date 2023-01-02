type WC_Order = {
	id: number
	parent_id: number
	status: string
	currency: string
	version: string
	prices_include_tax: boolean
	date_created: string
	date_modified: string
	discount_total: string
	discount_tax: string
	shipping_total: string
	shipping_tax: string
	cart_tax: string
	total: string
	total_tax: string
	customer_id: number
	order_key: string
	billing: {
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
	shipping: {
		first_name: string
		last_name: string
		company: string
		address_1: string
		address_2: string
		city: string
		state: string
		postcode: string
		country: string
		phone: string
	}
	payment_method: string
	payment_method_title: string
	transaction_id: string
	customer_ip_address: string
	customer_user_agent: string
	created_via: string
	customer_note: string
	date_completed: null
	date_paid: string
	cart_hash: string
	number: string
	meta_data: {
		id: number
		key: string
		value: string
	}[]
	line_items: {
		id: number
		name: string
		product_id: number
		variation_id: number
		quantity: number
		tax_class: string
		subtotal: string
		subtotal_tax: string
		total: string
		total_tax: string
		taxes: []
		meta_data: {
			id: number
			key: string
			value: string
			display_key: string
			display_value: string
		}[]
		sku: string
		price: number
		image: {
			id: number
			src: string
		}
		parent_name: string
	}[]
	tax_lines: []
	shipping_lines: []
	fee_lines: []
	coupon_lines: []
	refunds: []
	payment_url: string
	is_editable: boolean
	needs_payment: boolean
	needs_processing: boolean
	date_created_gmt: string
	date_modified_gmt: string
	date_completed_gmt: null
	date_paid_gmt: string
	currency_symbol: string
	_links: {
		self: {
			href: string
		}[]
		collection: {
			href: string
		}[]
		customer: {
			href: string
		}[]
	}
}
