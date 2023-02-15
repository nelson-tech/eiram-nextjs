"use client"

import { LineItem, Order } from "@api/codegen/graphql"

import Link from "component/Link"
import OrderLineItem from "component/OrderLineItem"

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
					{order.status && titleCase(order.status)}
				</p>
			</div>
		)
	}

	return (
		<div className=" border-gray-200 bg-white shadow-sm rounded-lg border">
			<h3 className="sr-only">
				Order placed on <time dateTime={order.date ?? ""}>{orderDate}</time>
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
							<time dateTime={order.date ?? ""}>{orderDate}</time>
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
				{order.lineItems?.nodes.map((lineItem: LineItem) => (
					<li key={lineItem.id} className="p-4 sm:p-6">
						<OrderLineItem lineItem={lineItem} />
					</li>
				))}
			</ul>
		</div>
	)
}

export default OrderSummary
