import { Metadata } from "next/dist/lib/metadata/types/metadata-interface"

import getClient from "@api/client"
import { GetOrderDataByIdDocument, Order } from "@api/codegen/graphql"
import getTokensServer from "@lib/utils/getTokensServer"

import OrderConfirmation from "component/OrderConfirmation"
import UserOrderError from "component/UserOrderError"

const getOrder = async (orderNumber: string | null | undefined) => {
	if (orderNumber) {
		const { tokens } = await getTokensServer()

		try {
			const client = getClient(tokens)

			const orderData = await client.request(GetOrderDataByIdDocument, { id: orderNumber })

			return orderData.order as Order
		} catch (error) {
			console.warn("Error fetching order in Thank you page.", error)
		}
	}
}

const ThanksPage = async ({ searchParams }: { searchParams?: { orderNumber: string } }) => {
	const order = await getOrder(searchParams?.orderNumber)

	return (
		<div className="max-w-7xl mx-auto">
			<div className="py-8 px-6 w-full h-full">
				{order ? (
					<OrderConfirmation order={order} orderNumber={searchParams?.orderNumber} />
				) : (
					<>
						<div>
							<h2 className="text-xl font-extrabold text-gray-400 text-center">
								<p>Oops, no order found...</p>
								<p>
									Please{" "}
									<a
										href={`mailto:info@eiramknitwear.com?subject=Missing%20Order${
											searchParams?.orderNumber ? `%20%23%20${searchParams?.orderNumber}` : ""
										}`}
										title="Contact Us"
										className="text-accent underline hover:text-highlight transition-all"
									>
										contact us
									</a>{" "}
									if you think there&apos;s been a mistake.
								</p>
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
export async function generateMetadata(params): Promise<Metadata> {
	let orderNumber: string | null | undefined
	try {
		const order = await getOrder(params?.searchParams?.orderNumber)
		order?.orderNumber && (orderNumber = order?.orderNumber)
	} catch (error) {}

	const metaData: Metadata = {
		metadataBase: null,
		title: orderNumber ? `Order #${orderNumber} Confirmation` : `Order Confirmation`,
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
