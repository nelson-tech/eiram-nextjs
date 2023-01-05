import getPageBySlug from "@lib/server/getPageBySlug"

import Link from "@components/Link"

const OtherPage = async ({ params }: { params: { slug: string } }) => {
	const data = await getPageBySlug(params.slug)

	const pageData = data

	return (
		<div className="sm:px-16 py-8 max-w-7xl mx-auto text-gray-500">
			<h2 className="text-4xl font-bold font-sans tracking-wide pb-8 text-center">
				{pageData?.title?.rendered ?? "Oops..."}
			</h2>
			{pageData?.content?.rendered ? (
				<div
					className="wp-container"
					dangerouslySetInnerHTML={{ __html: pageData.content.rendered }}
				/>
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
