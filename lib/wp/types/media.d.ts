type WP_MediaType = {
	id: number
	date: string
	date_gmt: string
	guid: {
		rendered: string
	}
	modified: string
	modified_gmt: string
	slug: string
	status: string
	type: string
	link: string
	title: {
		rendered: string
	}
	author: number
	comment_status: string
	ping_status: string
	template: string
	meta: []
	acf: []
	description: {
		rendered: string
	}
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
		sizes: {}
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
	post: number
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
				embeddable: true
				href: string
			},
		]
		replies: [
			{
				embeddable: true
				href: string
			},
		]
	}
}

type WP_ImageArrayType = {
	ID: number
	id: number
	title: string
	filename: string
	filesize: number
	url: string
	link: string
	alt: string
	author: string
	description: string
	caption: string
	name: string
	status: string
	uploaded_to: number
	date: string
	modified: string
	menu_order: number
	mime_type: string
	type: string
	subtype: string
	icon: string
	width: number
	height: number
}
