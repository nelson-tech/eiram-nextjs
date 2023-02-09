import getOrderById from "@lib/server/getOrderById"

import AuthChecker from "@components/AuthChecker"
import Link from "@components/Link"
import OrderDetails from "@components/OrderDetails"
import ArrowLeftIcon from "@icons/ArrowLeft"
import { Order } from "@api/codegen/graphql"

const OrderPage = async ({ params }: { params: { id: string } }) => {
	const order = await getOrderById(params.id)

	return (
		<>
			<AuthChecker redirect="/shop" />
			<div className="max-w-7xl mx-auto py-8 px-8 sm:px-6 lg:pb-24 lg:px-8">
				<div className="max-w-xl">
					<div className="w-full relative flex items-center">
						<h1 className="text-2xl uppercase font-extrabold tracking-tight text-gray-900 sm:text-3xl">
							Order Details
						</h1>
						<h2 className="sr-only">Refresh orders</h2>
						<Link
							className="ml-4 text-gray-600 cursor-pointer hover:text-green-main transition"
							title="Return to orders"
							href="/orders"
						>
							<h2 className="sr-only">Return to orders</h2>
							<ArrowLeftIcon size={6} type="solid" />
						</Link>
					</div>
					<p className="mt-2 text-sm text-gray-500">
						Check the status of recent orders, manage returns, and download invoices.
					</p>
				</div>
				<div className="mt-16">
					<h2 className="sr-only">Order details</h2>

					<div className="space-y-8">
						<OrderDetails order={order as Order} />
					</div>
				</div>
			</div>
		</>
	)
}

export const revalidate = 0 // dynamically serve this page

export default OrderPage
