import getPageBySlug from "@lib/server/getPageBySlug"

import DefaultTags from "../DefaultTags"

const Head = async ({ params }: { params: { slug: string } }) => {
	const data = await getPageBySlug(params.slug)

	return (
		<>
			<DefaultTags />
			<title>{`${data.title.rendered} - Eiram Knitwear`}</title>
			<meta name="description" content={data.content.rendered} />
		</>
	)
}

export default Head
