"use client"

import { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import EllipsisVerticalIcon from "@heroicons/react/20/solid/EllipsisVerticalIcon"

import { LineItem, Order } from "@api/codegen/graphql"

import Link from "@components/Link"
import OrderLineItem from "@components/OrderLineItem"

type OrderSummaryInputType = {
	order: Order
	detailsLink?: boolean
}

const OrderSummary = ({ order, detailsLink = false }: OrderSummaryInputType) => {
	const orderDate = order?.date ? new Date(order.date).toLocaleDateString() : null

	const titleCase = (str: string) => {
		let splitStr = str.toLowerCase().split(" ")
		for (let i = 0; i < splitStr.length; i++) {
			// You do not need to check if i is larger than splitStr length, as your for does that for you
			// Assign it back to the array
			splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
		}
		// Directly return the joined string
		return splitStr.join(" ")
	}

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
		return (
			<div className="mr-4">
				<p
					className={`inline-flex rounded-md ml-2 px-4 py-2 text-sm text-gray-900 leading-5 ${
						order.status === "PROCESSING"
							? "bg-green-100"
							: order.status === "PENDING"
							? "bg-yellow-100"
							: order.status === "FAILED"
							? "bg-red-100"
							: ""
					}`}
				>
					{titleCase(order.status)}
				</p>
			</div>
		)
	}

	return (
		<div className=" border-gray-200 bg-white shadow-sm rounded-lg border">
			<h3 className="sr-only">
				Order placed on <time dateTime={order.date}>{orderDate}</time>
			</h3>

			<div className="group relative flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
				<dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
					<div>
						<dt className="font-medium text-gray-900">Order number</dt>
						<dd className="mt-1 text-gray-500">{order.orderNumber}</dd>
					</div>
					<div className="hidden sm:block">
						<dt className="font-medium text-gray-900">Date placed</dt>
						<dd className="mt-1 text-gray-500">
							<time dateTime={order.date}>{orderDate}</time>
						</dd>
					</div>
					<div>
						<dt className="font-medium text-gray-900">Total amount</dt>
						<dd className="mt-1 font-medium text-gray-900">{order.total}</dd>
					</div>
				</dl>

				<Link className=" flex justify-end lg:hidden" href={`/order/${order.orderNumber}}`}>
					<span aria-hidden="true" className="absolute inset-0" />
					<OrderStatus />
				</Link>

				<div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
					<OrderStatus />
					<Link
						href={`/order/${order.orderNumber}`}
						className="flex items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>
						<span>View Order</span>
						<span className="sr-only">{order.orderNumber}</span>
					</Link>
				</div>
			</div>

			{/* Products */}
			<h4 className="sr-only">Items</h4>
			<ul role="list" className="divide-y divide-gray-200">
				{order.lineItems.nodes &&
					order.lineItems.nodes.map((lineItem: LineItem) => (
						<li key={lineItem.id} className="p-4 sm:p-6">
							<OrderLineItem lineItem={lineItem} />
						</li>
					))}
			</ul>
		</div>
		// <li className="font-karla">
		// 	<LinkOrDiv>
		// 		<div className="flex items-center px-4 py-4 sm:px-6">
		// 			<div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
		// 				<div className="truncate">
		// 					<div className="flex text-sm">
		// 						<p className="truncate font-medium text-accent">Order #: {order.orderNumber}</p>

		// 						<div className="ml-4 flex text-gray-500">
		// 							<div className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400">
		// 								<svg
		// 									fill="none"
		// 									stroke="currentColor"
		// 									viewBox="0 0 24 24"
		// 									xmlns="http://www.w3.org/2000/svg"
		// 								>
		// 									<path
		// 										strokeLinecap="round"
		// 										strokeLinejoin="round"
		// 										strokeWidth="2"
		// 										d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
		// 									></path>
		// 								</svg>
		// 							</div>
		// 							Items: {order.lineItems.nodes.length}
		// 						</div>
		// 						<div className="ml-4 flex text-gray-500">
		// 							<div className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400">
		// 								<svg
		// 									xmlns="http://www.w3.org/2000/svg"
		// 									fill="none"
		// 									viewBox="0 0 24 24"
		// 									strokeWidth={1.5}
		// 									stroke="currentColor"
		// 								>
		// 									<path
		// 										strokeLinecap="round"
		// 										strokeLinejoin="round"
		// 										d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
		// 									/>
		// 								</svg>
		// 							</div>
		// 							Total: {order.total}
		// 						</div>
		// 					</div>
		// 					<div className="mt-4 flex items-center">
		// 						<div className="flex items-center text-sm text-gray-500">
		// 							<CalendarIcon
		// 								className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
		// 								aria-hidden="true"
		// 							/>
		// 							<p>
		// 								<time dateTime={order.date}>{orderDate}</time>
		// 							</p>
		// 						</div>
		// 						<div className=" sm:hidden">
		// 							<OrderStatus />
		// 						</div>
		// 					</div>
		// 				</div>
		// 				<div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5 hidden sm:block">
		// 					<OrderStatus />
		// 				</div>
		// 			</div>
		// 			{detailsLink && (
		// 				<div className="ml-5 flex-shrink-0">
		// 					<ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
		// 				</div>
		// 			)}
		// 		</div>
		// 	</LinkOrDiv>
		// </li>
	)
}

export default OrderSummary
