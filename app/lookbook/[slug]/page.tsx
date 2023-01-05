import { REST_WP } from "@lib/constants"
import useAPI from "@lib/hooks/useAPI"

import Lookbook from "@components/Lookbook"

const getLookbook = async (slug: string) => {
	const { fetchAPI } = useAPI()

	const lookbookResponse = await fetchAPI({
		url: REST_WP + "/lookbooks?slug=" + slug + "&acf_format=standard",
	})

	const lookbookData: WP_LookbookType[] = await lookbookResponse?.json()

	const lookbook: WP_LookbookType | null =
		lookbookData && lookbookData.length > 0 ? lookbookData[0] : null

	return lookbook
}

const LookbookPage = async ({ params }: { params: { slug: string } }) => {
	const lookbook = await getLookbook(params.slug)

	return lookbook ? <Lookbook lookbook={lookbook} /> : <></>
}

export default LookbookPage
