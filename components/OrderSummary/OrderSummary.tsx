"use client"

import { CalendarIcon, ChevronRightIcon } from "@heroicons/react/20/solid"

import { Order } from "@api/codegen/graphql"

import Link from "@components/Link"

type OrderSummaryInputType = {
	order: Order
	detailsLink?: boolean
}

const OrderSummary = ({ order, detailsLink = false }: OrderSummaryInputType) => {
	const orderDate = order?.date ? new Date(order.date).toLocaleDateString() : null

	const LinkOrDiv = ({ children }) => {
		return detailsLink ? (
			<Link href={`/order/${order.orderNumber}`} className="block hover:bg-gray-50">
				{children}
			</Link>
		) : (
			<div className="block">{children}</div>
		)
	}

	const OrderStatus = () => {
		const status = order.status.toLowerCase()
		return (
			<div className="flex -space-x-1 justify-center items-center h-full text-sm text-gray-500 overflow-hidden mr-8">
				<p
					className={`inline-flex rounded-full ml-2 px-2 text-xs font-semibold text-gray-500 leading-5 ${
						status === "processing"
							? "bg-green-100"
							: status === "pending"
							? "bg-yellow-100"
							: status === "failed"
							? "bg-red-100"
							: ""
					}`}
				>
					{status.toUpperCase()}
				</p>
			</div>
		)
	}

	return (
		<li className="font-karla">
			<LinkOrDiv>
				<div className="flex items-center px-4 py-4 sm:px-6">
					<div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
						<div className="truncate">
							<div className="flex text-sm">
								<p className="truncate font-medium text-accent">Order #: {order.orderNumber}</p>

								<div className="ml-4 flex text-gray-500">
									<div className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400">
										<svg
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
											></path>
										</svg>
									</div>
									Items: {order.lineItems.nodes.length}
								</div>
							</div>
							<div className="mt-4 flex items-center">
								<div className="flex items-center text-sm text-gray-500">
									<CalendarIcon
										className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
										aria-hidden="true"
									/>
									<p>
										<time dateTime={order.date}>{orderDate}</time>
									</p>
								</div>
								<div className=" sm:hidden">
									<OrderStatus />
								</div>
							</div>
						</div>
						<div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5 hidden sm:block">
							<OrderStatus />
						</div>
					</div>
					{detailsLink && (
						<div className="ml-5 flex-shrink-0">
							<ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
						</div>
					)}
				</div>
			</LinkOrDiv>
		</li>
	)
}

export default OrderSummary
