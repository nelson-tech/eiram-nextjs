import { REST_WP } from "@lib/constants"
import useAPI from "@lib/hooks/useAPI"

import Lookbook from "@components/Lookbook"

const getLookbook = async (slug: string) => {
	const { fetchAPI } = useAPI()

	const lookbookData: WP_LookbookType[] = await (
		await fetchAPI({ url: REST_WP + "/lookbooks?slug=" + slug })
	).json()

	const lookbook: WP_LookbookType = lookbookData[0]

	const imagesResponses = lookbook?.acf?.media?.images
		? await Promise.all(
				lookbook.acf.media.images.map((image) => fetchAPI({ url: REST_WP + "/media/" + image })),
		  )
		: null
	const images: WP_MediaType[] = imagesResponses
		? await Promise.all(imagesResponses.map((image) => image.json()))
		: null
	const video: WP_MediaType = lookbook?.acf?.media?.video
		? await (await fetchAPI({ url: REST_WP + "/media/" + lookbook.acf.media.video })).json()
		: null

	return {
		...lookbook,
		images,
		video,
	}
}

const LookbookPage = async ({ params }: { params: { slug: string } }) => {
	const lookbook = await getLookbook(params.slug)

	return <Lookbook lookbook={lookbook} />
}

export default LookbookPage
