import { Metadata } from "next/dist/lib/metadata/types/metadata-interface"

import getClient from "@api/client"
import { GetOrderDataByIdDocument, Order } from "@api/codegen/graphql"
import getTokensServer from "@lib/utils/getTokensServer"

import OrderConfirmation from "components/OrderConfirmation"
import UserOrderError from "components/UserOrderError"

const getOrder = async (id: string) => {
	const { tokens } = await getTokensServer()

	const client = getClient(tokens)

	const orderData = await client.request(GetOrderDataByIdDocument, { id })

	return orderData.order as Order
}

const ThanksPage = async ({ searchParams }: { searchParams?: { id: string } }) => {
	const order = await getOrder(searchParams.id)

	return (
		<div className="max-w-7xl mx-auto">
			<div className="py-8 px-6 w-full h-full">
				{order ? (
					<OrderConfirmation order={order} orderNumber={searchParams.id} />
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

export const revalidate = 0 // dynamically serve this page

export default ThanksPage

// @ts-ignore
export async function generateMetadata({ searchParams }) {
	const order = await getOrder(searchParams?.id)

	const metaData: Metadata = {
		title: order?.orderNumber ? `Order #${order.orderNumber} Confirmation` : `Order Confirmation`,
		robots: {
			index: false,
			follow: false,
			nocache: true,
			googleBot: {
				index: false,
				follow: false,
				noimageindex: true,
			},
		},
	}

	return metaData
}
