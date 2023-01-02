import AuthChecker from "@components/AuthChecker"
import Link from "@components/Link"
import OrderSummary from "@components/OrderSummary"
import { FRONTEND_BASE } from "@lib/constants"
import getTokens from "@lib/utils/getTokens"

const getOrders = async () => {
	const { tokens } = getTokens()

	const response = await fetch(FRONTEND_BASE + "/api/orders", {
		method: "POST",
		body: JSON.stringify({ tokens }),
	})

	const data: WC_Order[] = await response.json()

	return data
}

const OrdersPage = async () => {
	const orders = await getOrders()

	// TODO - Add pagination
	return (
		<>
			<AuthChecker redirect="/shop" />
			<div className="max-w-7xl mx-auto py-8 px-8 sm:px-6 lg:pb-24 lg:px-8">
				<div className="max-w-xl">
					<div className="w-full relative flex items-center">
						<h1 className="text-2xl uppercase font-extrabold tracking-tight text-gray-900 sm:text-3xl">
							Order History
						</h1>
					</div>
					<p className="mt-2 text-sm text-gray-500">
						Check the status of recent orders, manage returns, and download invoices.
					</p>
				</div>
				<div className="mt-16">
					<h2 className="sr-only">Recent orders</h2>

					{orders && orders.length > 1 ? (
						<div className="overflow-hidden bg-white shadow sm:rounded-md">
							<ul role="list" className="divide-y divide-gray-200">
								{orders
									.filter((order) => order.status.toLowerCase() !== "checkout-draft")
									.map((order) => {
										return <OrderSummary order={order} detailsLink key={order.number} />
									})}
							</ul>
						</div>
					) : (
						<div className="text-gray-600">
							<h2 className="font-bold py-2">No orders found.</h2>
							<div>
								<Link
									href="/shop"
									title="Visit our shop."
									className="text-accent hover:text-highlight transition-all"
								>
									Visit our shop
								</Link>{" "}
								to place your first order.
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default OrdersPage
