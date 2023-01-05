import getLookbook from "@lib/server/getLookbook"

import DefaultTags from "../../DefaultTags"

const Head = async ({ params }: { params: { slug: string } }) => {
	const lookbook = await getLookbook(params.slug)

	return (
		<>
			<DefaultTags />
			<title>{`${lookbook.title.rendered} - Eiram Knitwear`}</title>
			<meta name="description" content={lookbook.content.rendered} />
		</>
	)
}

export default Head
