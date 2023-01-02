type WP_Product_Type = {
	id: number
	parent_id: number
	name: string
	type: string
	slug: string
	permalink: string
	sku: string
	description: string
	short_description: string
	dates: {
		created: string
		created_gmt: string
		modified: string
		modified_gmt: string
	}
	featured: boolean
	prices: {
		price: string
		regular_price: string
		sale_price: string
		price_range: {
			from: string
			to: string
		}
		on_sale: boolean
		date_on_sale: {
			from: null
			from_gmt: null
			to: null
			to_gmt: null
		}
		currency: {
			currency_code: string
			currency_symbol: string
			currency_minor_unit: number
			currency_decimal_separator: string
			currency_thousand_separator: string
			currency_prefix: string
			currency_suffix: string
		}
	}
	hidden_conditions: {
		virtual: boolean
		downloadable: boolean
		manage_stock: boolean
		sold_individually: boolean
		reviews_allowed: boolean
		shipping_required: boolean
	}
	average_rating: string
	review_count: number
	rating_count: number
	rated_out_of: string
	images: [
		{
			id: number
			src: {
				thumbnail: string
				medium: string
				medium_large: string
				large: string
				string: string
				string: string
				woocommerce_thumbnail: string
				woocommerce_single: string
				woocommerce_gallery_thumbnail: string
				full: string
				custom: string
			}
			name: string
			alt: string
			position: number
			featured: boolean
		},
		{
			id: number
			src: {
				thumbnail: string
				medium: string
				medium_large: string
				large: string
				string: string
				string: string
				woocommerce_thumbnail: string
				woocommerce_single: string
				woocommerce_gallery_thumbnail: string
				full: string
				custom: string
			}
			name: string
			alt: string
			position: number
			featured: boolean
		},
		{
			id: number
			src: {
				thumbnail: string
				medium: string
				medium_large: string
				large: string
				string: string
				string: string
				woocommerce_thumbnail: string
				woocommerce_single: string
				woocommerce_gallery_thumbnail: string
				full: string
				custom: string
			}
			name: string
			alt: string
			position: number
			featured: boolean
		},
		{
			id: number
			src: {
				thumbnail: string
				medium: string
				medium_large: string
				large: string
				string: string
				string: string
				woocommerce_thumbnail: string
				woocommerce_single: string
				woocommerce_gallery_thumbnail: string
				full: string
				custom: string
			}
			name: string
			alt: string
			position: number
			featured: boolean
		},
		{
			id: number
			src: {
				thumbnail: string
				medium: string
				medium_large: string
				large: string
				string: string
				string: string
				woocommerce_thumbnail: string
				woocommerce_single: string
				woocommerce_gallery_thumbnail: string
				full: string
				custom: string
			}
			name: string
			alt: string
			position: number
			featured: boolean
		},
		{
			id: number
			src: {
				thumbnail: string
				medium: string
				medium_large: string
				large: string
				string: string
				string: string
				woocommerce_thumbnail: string
				woocommerce_single: string
				woocommerce_gallery_thumbnail: string
				full: string
				custom: string
			}
			name: string
			alt: string
			position: number
			featured: boolean
		},
		{
			id: number
			src: {
				thumbnail: string
				medium: string
				medium_large: string
				large: string
				string: string
				string: string
				woocommerce_thumbnail: string
				woocommerce_single: string
				woocommerce_gallery_thumbnail: string
				full: string
				custom: string
			}
			name: string
			alt: string
			position: number
			featured: boolean
		},
	]
	categories: [
		{
			id: number
			name: string
			slug: string
			rest_url: string
		},
	]
	tags: []
	attributes: {
		[key: string]: {
			id: number
			name: string
			position: number
			is_attribute_visible: boolean
			used_for_variation: boolean
			options: {
				[key: string]: string
			}
		}
	}
	default_attributes: []
	variations: [
		{
			id: number
			sku: string
			description: string
			attributes: {
				[key: string]: string
			}
			featured_image: {
				thumbnail: string
				medium: string
				medium_large: string
				large: string
				string: string
				string: string
				woocommerce_thumbnail: string
				woocommerce_single: string
				woocommerce_gallery_thumbnail: string
				full: string
				custom: string
			}
			prices: {
				price: string
				regular_price: string
				sale_price: string
				on_sale: boolean
				date_on_sale: {
					from: null
					from_gmt: null
					to: null
					to_gmt: null
				}
				currency: {
					currency_code: string
					currency_symbol: string
					currency_minor_unit: number
					currency_decimal_separator: string
					currency_thousand_separator: string
					currency_prefix: string
					currency_suffix: string
				}
			}
			add_to_cart: {
				is_purchasable: boolean
				purchase_quantity: {
					min_purchase: number
					max_purchase: number
				}
				rest_url: string
			}
		},
	]
	grouped_products: []
	stock: {
		is_in_stock: boolean
		stock_quantity: null
		stock_status: string
		backorders: string
		backorders_allowed: boolean
		backordered: boolean
		low_stock_amount: string
	}
	weight: {
		value: string
		unit: string
	}
	dimensions: {
		length: string
		width: string
		height: string
		unit: string
	}
	reviews: []
	related: [
		{
			id: number
			name: string
			permalink: string
			price: string
			add_to_cart: {
				text: string
				description: string
				rest_url: string
			}
			rest_url: string
		},
	]
	upsells: []
	cross_sells: []
	total_sales: number
	external_url: string
	button_text: string
	add_to_cart: {
		text: string
		description: string
		has_options: boolean
		is_purchasable: boolean
		purchase_quantity: []
		rest_url: string
	}
	meta_data: []
	_links: {
		self: [
			{
				permalink: string
				href: string
			},
		]
		collection: [
			{
				permalink: string
				href: string
			},
		]
		variations: [
			{
				permalink: string
				href: string
			},
			{
				permalink: string
				href: string
			},
			{
				permalink: string
				href: string
			},
			{
				permalink: string
				href: string
			},
			{
				permalink: string
				href: string
			},
			{
				permalink: string
				href: string
			},
			{
				permalink: string
				href: string
			},
			{
				permalink: string
				href: string
			},
		]
	}
}

type WC_ProductType = {
	id: number
	name: string
	parent: number
	type: string
	variation: string
	permalink: string
	sku: string
	short_description: string
	description: string
	on_sale: boolean
	prices: {
		price: string
		regular_price: string
		sale_price: string
		price_range: null
		currency_code: string
		currency_symbol: string
		currency_minor_unit: number
		currency_decimal_separator: string
		currency_thousand_separator: string
		currency_prefix: string
		currency_suffix: string
	}
	price_html: string
	average_rating: string
	review_count: number
	images: {
		id: number
		src: string
		thumbnail: string
		srcset: string
		sizes: string
		name: string
		alt: string
	}[]
	categories: {
		id: number
		name: string
		slug: string
		description: string
		parent: number
		count: number
		image: {
			id: number
			src: string
			thumbnail: string
			srcset: string
			sizes: string
			name: string
			alt: string
		}
		review_count: number
		permalink: string
	}[]
	tags: []
	attributes: {
		id: number
		name: string
		taxonomy: null
		has_variations: boolean
		terms: {
			id: number
			name: string
			slug: string
		}[]
	}[]
	variations: {
		id: number
		attributes: {
			name: string
			value: string
		}[]
	}[]
	has_options: boolean
	is_purchasable: boolean
	is_in_stock: boolean
	is_on_backorder: boolean
	low_stock_remaining: null
	sold_individually: boolean
	add_to_cart: {
		text: string
		description: string
		url: string
		minimum: number
		maximum: number
		multiple_of: number
	}
	extensions: {}
}
