"use client"

import Link from "@components/Link"
import { CalendarIcon, ChevronRightIcon } from "@heroicons/react/20/solid"

type OrderSummaryInputType = {
	order: WC_Order
	detailsLink?: boolean
}

const OrderSummary = ({ order, detailsLink = false }: OrderSummaryInputType) => {
	const orderDate = order?.date_created ? new Date(order.date_created).toLocaleDateString() : null

	const LinkOrDiv = ({ children }) => {
		return detailsLink ? (
			<Link href={`/order/${order.number}`} className="block hover:bg-gray-50">
				{children}
			</Link>
		) : (
			<div className="block">{children}</div>
		)
	}

	return (
		<li className="font-karla">
			<LinkOrDiv>
				<div className="flex items-center px-4 py-4 sm:px-6">
					<div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
						<div className="truncate">
							<div className="flex text-sm">
								<p className="truncate font-medium text-accent">Order #: {order.number}</p>

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
									Items: {order.line_items.length}
								</div>
							</div>
							<div className="mt-4 flex items-center">
								<div className="flex items-center text-sm text-gray-500">
									<CalendarIcon
										className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
										aria-hidden="true"
									/>
									<p>
										<time dateTime={order.date_created}>{orderDate}</time>
									</p>
								</div>
								<div className=" sm:hidden">
									<div className="flex -space-x-1 justify-center items-center h-full text-sm text-gray-500 overflow-hidden mr-8">
										<p className="inline-flex rounded-full bg-green-100 ml-2 px-2 text-xs font-semibold text-gray-500 leading-5">
											{order.status.toUpperCase()}
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5 hidden sm:block">
							<div className="flex -space-x-1 justify-center items-center h-full text-sm text-gray-500 overflow-hidden mr-8">
								<p className="inline-flex rounded-full bg-green-100 ml-2 px-2 text-xs font-semibold text-gray-500 leading-5">
									{order.status.toUpperCase()}
								</p>
							</div>
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
