import { LineItem, Order } from "@api/codegen/graphql"
import OrderLineItem from "@components/OrderLineItem"
import OrderSummary from "@components/OrderSummary"

type OrderDetailsInputType = {
	order: Order
}

const OrderDetails = ({ order }: OrderDetailsInputType) => {
	const orderDate = order?.date ? new Date(order.date).toLocaleDateString() : null
	return (
		<div>
			<h3 className="sr-only">
				Order placed on <time dateTime={order.date || ""}>{orderDate}</time>
			</h3>

			<div className="overflow-hidden bg-white shadow sm:rounded-md">
				<ul role="list" className="divide-y divide-gray-200">
					<OrderSummary order={order} />
				</ul>
			</div>

			<div className="overflow-hidden bg-white shadow sm:rounded-md mt-8">
				<ul role="list" className="divide-y divide-gray-200">
					{order.lineItems?.nodes.map((lineItem: LineItem) => (
						<OrderLineItem lineItem={lineItem} key={lineItem.id} />
					))}
				</ul>
			</div>
		</div>
	)
}

export default OrderDetails
