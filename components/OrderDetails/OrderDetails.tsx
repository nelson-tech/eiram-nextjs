import OrderLineItem from "@components/OrderLineItem"
import OrderSummary from "@components/OrderSummary"

type OrderDetailsInputType = {
	order: WC_Order
}

const OrderDetails = ({ order }: OrderDetailsInputType) => {
	const orderDate = order?.date_created ? new Date(order.date_created).toLocaleDateString() : null
	return (
		<div>
			<h3 className="sr-only">
				Order placed on <time dateTime={order.date_created || ""}>{orderDate}</time>
			</h3>

			<div className="overflow-hidden bg-white shadow sm:rounded-md">
				<ul role="list" className="divide-y divide-gray-200">
					<OrderSummary order={order} />
				</ul>
			</div>

			<div className="overflow-hidden bg-white shadow sm:rounded-md mt-8">
				<ul role="list" className="divide-y divide-gray-200">
					{order.line_items.map((lineItem) => (
						<OrderLineItem lineItem={lineItem} key={lineItem.id} />
					))}
				</ul>
			</div>

			{/* <table className="mt-4 w-full text-gray-500 sm:mt-6">
				<caption className="sr-only">Products</caption>
				<thead className="sr-only text-sm text-gray-500 text-left sm:not-sr-only">
					<tr>
						<th scope="col" className="pr-8 py-3 font-normal">
							{" "}
							Product{" "}
						</th>
						<th scope="col" className="hidden w-1/5 pr-8 py-3 font-normal sm:table-cell">
							{" "}
							Price{" "}
						</th>
						<th scope="col" className="hidden pr-8 py-3 font-normal sm:table-cell">
							{" "}
							Qty{" "}
						</th>
						<th scope="col" className="hidden pr-8 py-3 font-normal sm:table-cell">
							{" "}
							Total{" "}
						</th>
						<th scope="col" className="w-0 py-3 font-normal text-right">
							{" "}
							Link{" "}
						</th>
					</tr>
				</thead>
				<tbody className="border-b border-gray-200 divide-y divide-gray-200 text-sm sm:border-t">
					{order.line_items.map((lineItem) => (
						<OrderLineItem lineItem={lineItem} />
					))}
				</tbody>
			</table> */}
		</div>
	)
}

export default OrderDetails
