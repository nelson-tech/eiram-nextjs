import OrderConfirmation from "@components/OrderConfirmation"
import UserOrderError from "@components/UserOrderError"
import { FRONTEND_BASE } from "@lib/constants"
import getTokens from "@lib/utils/getTokens"

const getOrder = async (id: string) => {
	const { tokens } = getTokens()

	const response = await fetch(FRONTEND_BASE + "/api/orders", {
		method: "POST",
		body: JSON.stringify({ tokens, orderId: id }),
	})

	const data: WC_Order = await response.json()

	return data
}

const ThanksPage = async ({ params }: { params: { id: string } }) => {
	const order = await getOrder(params.id)

	return (
		<div className="max-w-7xl mx-auto">
			<div className="py-8 px-6 w-full h-full">
				{order ? (
					<OrderConfirmation order={order} orderNumber={params.id} />
				) : (
					<>
						<div>
							<h2 className="text-xl font-extrabold text-gray-400 text-center">
								<p>Oops, no order found...</p>
								<p>Please contact us if you think there&apos;s been a mistake.</p>
							</h2>
						</div>
						<UserOrderError />
					</>
				)}
			</div>
		</div>
	)
}

export default ThanksPage
