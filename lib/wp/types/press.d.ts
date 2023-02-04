type WP_PressType = WP_REST_API_Post & {
	_embedded: {
		"wp:featuredmedia": [
			{
				id: number
				date: string
				slug: string
				type: string
				link: string
				title: {
					rendered: string
				}
				author: number
				acf: []
				caption: {
					rendered: string
				}
				alt_text: string
				media_type: string
				mime_type: string
				media_details: {
					width: number
					height: number
					file: string
					filesize: number
					sizes: {
						medium_large: {
							file: string
							width: number
							height: number
							filesize: number
							mime_type: string
							source_url: string
						}
						woocommerce_thumbnail: {
							file: string
							width: number
							height: number
							filesize: number
							uncropped: boolean
							mime_type: string
							source_url: string
						}
						woocommerce_single: {
							file: string
							width: number
							height: number
							filesize: number
							mime_type: string
							source_url: string
						}
						woocommerce_gallery_thumbnail: {
							file: string
							width: number
							height: number
							filesize: number
							mime_type: string
							source_url: string
						}
						full: {
							file: string
							width: number
							height: number
							mime_type: string
							source_url: string
						}
					}
					image_meta: {
						aperture: string
						credit: string
						camera: string
						caption: string
						created_timestamp: string
						copyright: string
						focal_length: string
						iso: string
						shutter_speed: string
						title: string
						orientation: string
						keywords: []
					}
				}
				source_url: string
				_links: {
					self: [
						{
							href: string
						},
					]
					collection: [
						{
							href: string
						},
					]
					about: [
						{
							href: string
						},
					]
					author: [
						{
							embeddable: boolean
							href: string
						},
					]
					replies: [
						{
							embeddable: boolean
							href: string
						},
					]
				}
			},
		]
	}
}
