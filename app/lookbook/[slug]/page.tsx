import getLookbook from "@lib/server/getLookbook"

import Lookbook from "@components/Lookbook"

const LookbookPage = async ({ params }: { params: { slug: string } }) => {
	const lookbook = await getLookbook(params.slug)

	return lookbook ? <Lookbook lookbook={lookbook} /> : <></>
}

export default LookbookPage
