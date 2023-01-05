import getOrderById from "@lib/server/getOrderById"

import DefaultTags from "../../DefaultTags"

const Head = async ({ params }: { params: { id: string } }) => {
	const order = await getOrderById(params.id)

	return (
		<>
			<DefaultTags />
			<title>{`Order #${order.id} - Eiram Knitwear`}</title>
		</>
	)
}

export default Head
