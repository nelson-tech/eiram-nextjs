type WP_LookbookType = {
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
	content: {
		rendered: string
		protected: false
	}
	featured_media: number
	template: string
	acf: {
		media: {
			coverImage: number
			images: number[]
			video: number
		}
	}
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
		string: [
			{
				href: string
			},
		]
		curies: [
			{
				name: string
				href: string
				templated: true
			},
		]
	}
}
