import Link from "@components/Link"
import { GetPageDataBySlugQuery } from "@api/codegen/graphql"
import getCachedQuery from "@lib/server/getCachedQuery"
import getPageBySlug from "@lib/server/getPageBySlug"

const OtherPage = async ({ params }: { params: { slug: string } }) => {
	const { data } = await getPageBySlug(params.slug)
	const pageData = data?.page

	return (
		<div className="sm:px-16 py-8 max-w-7xl mx-auto text-gray-500">
			<h2 className="text-4xl font-bold font-sans tracking-wide pb-8 text-center">
				{pageData?.title ?? "Oops..."}
			</h2>
			{pageData?.content ? (
				<div className="wp-container" dangerouslySetInnerHTML={{ __html: pageData.content }} />
			) : (
				<div className="text-center">
					<p>The page requested could not be found.</p>
					<p>
						Click{" "}
						<Link href="/" className="underline text-accent hover:text-highlight">
							here
						</Link>{" "}
						to go to the homepage, or{" "}
						<Link href="/shop" className="underline text-accent hover:text-highlight">
							visit our shop
						</Link>
						.
					</p>
				</div>
			)}
		</div>
	)
}

export default OtherPage
