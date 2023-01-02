type WC_Cart_Item = {
	backorders: string
	cart_item_data: []
	featured_image: string
	id: number
	image: {
		alt: string
		title: string
		url: string
		meta: {
			file: string
			height: number
			width: number
		}
	}
	item_key: string
	meta: {
		product_type: string
		sku: string
		dimensions: { height: string; length: string; unit: string; width: string }
		weight: number
		variation: { [key: string]: string }
	}
	name: string
	price: string
	quantity: { value: number; min_purchase: number; max_purchase: number }
	slug: string
	title: string
	totals: { subtotal: string; subtotal_tax: number; total: number; tax: number }
}

// type WC_Cart = {
// 	cart_hash: string
// 	cart_key: string
// 	currency: {
// 		currency_code: string
// 		currency_symbol: string
// 		currency_minor_unit: number
// 		currency_decimal_separator: string
// 		currency_thousand_separator: string
// 		currency_prefix: string
// 		currency_suffix: string
// 	}
// 	customer: {
// 		billing_address: {
// 			billing_first_name: string
// 			billing_last_name: string
// 			billing_company: string
// 			billing_country: string
// 			billing_address_1: string
// 			billing_address_2: string
// 			billing_city: string
// 			billing_state: string
// 			billing_postcode: string
// 			billing_phone: string
// 			billing_email: string
// 		}
// 		shipping_address: {
// 			shipping_first_name: string
// 			shipping_last_name: string
// 			shipping_company: string
// 			shipping_country: string
// 			shipping_address_1: string
// 			shipping_address_2: string
// 			shipping_city: string
// 			shipping_state: string
// 			shipping_postcode: string
// 		}
// 	}
// 	items: WC_Cart_Item[]
// 	item_count: number
// 	items_weight: number
// 	coupons: []
// 	needs_payment: boolean
// 	needs_shipping: boolean
// 	shipping: []
// 	fees: []
// 	taxes: []
// 	totals: {
// 		subtotal: string
// 		subtotal_tax: string
// 		fee_total: string
// 		fee_tax: string
// 		discount_total: string
// 		discount_tax: string
// 		shipping_total: string
// 		shipping_tax: string
// 		total: string
// 		total_tax: string
// 	}
// 	removed_items: []
// 	cross_sells: []
// 	notices: []
// }

type WC_Cart_AddToCartInputType = {
	id: string
	quantity: string
	variation?: {
		attribute: string
		value: string
	}[]
}

type WC_CartType = {
	coupons: {
		code: string
		totals: {
			currency_code: string
			currency_symbol: string
			currency_minor_unit: number
			currency_decimal_separator: string
			currency_thousand_separator: string
			currency_prefix: string
			currency_suffix: string
			total_discount: string
			total_discount_tax: string
		}
	}[]
	shipping_rates: {
		package_id: number
		name: string
		destination: {
			address_1: string
			address_2: string
			city: string
			state: string
			postcode: string
			country: string
		}
		items: [
			{
				key: string
				name: string
				quantity: number
			},
			{
				key: string
				name: string
				quantity: number
			},
		]
		shipping_rates: {
			rate_id: string
			name: string
			description: string
			delivery_time: string
			price: string
			instance_id: number
			method_id: string
			meta_data: {
				key: string
				value: string
			}[]
			selected: boolean
			currency_code: string
			currency_symbol: string
			currency_minor_unit: number
			currency_decimal_separator: string
			currency_thousand_separator: string
			currency_prefix: string
			currency_suffix: string
		}[]
	}[]
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
	items: {
		key: string
		id: number
		quantity: number
		quantity_limits: {
			minimum: number
			maximum: number
			multiple_of: number
			editable: boolean
		}
		name: string
		summary: string
		short_description: string
		description: string
		sku: string
		low_stock_remaining: null
		backorders_allowed: boolean
		show_backorder_badge: boolean
		sold_individually: boolean
		permalink: string
		images: {
			id: number
			src: string
			thumbnail: string
			srcset: string
			sizes: string
			name: string
			alt: string
		}[]
		variation: { attribute: string; value: string }[]
		prices: {
			currency_code: string
			currency_symbol: string
			currency_minor_unit: number
			currency_decimal_separator: string
			currency_thousand_separator: string
			currency_prefix: string
			currency_suffix: string
			price: string
			regular_price: string
			sale_price: string
			price_range: null
			raw_prices: {
				precision: number
				price: string
				regular_price: string
				sale_price: string
			}
		}
		totals: {
			currency_code: string
			currency_symbol: string
			currency_minor_unit: number
			currency_decimal_separator: string
			currency_thousand_separator: string
			currency_prefix: string
			currency_suffix: string
			line_subtotal: string
			line_subtotal_tax: string
			line_total: string
			line_total_tax: string
		}
	}[]
	items_count: number
	items_weight: number
	needs_payment: boolean
	needs_shipping: boolean
	has_calculated_shipping: boolean
	totals: {
		currency_code: string
		currency_symbol: string
		currency_minor_unit: number
		currency_decimal_separator: string
		currency_thousand_separator: string
		currency_prefix: string
		currency_suffix: string
		total_items: string
		total_items_tax: string
		total_fees: string
		total_fees_tax: string
		total_discount: string
		total_discount_tax: string
		total_shipping: string
		total_shipping_tax: string
		total_price: string
		total_tax: string
		tax_lines: []
	}
	errors: []
	payment_requirements: string[]
	extensions: {}
}
