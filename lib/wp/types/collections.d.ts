type WP_CollectionType = WP_REST_API_Post & {
	acf: {
		media: {
			coverImage: string
			images: string[]
			video: string
		}
	}
}
