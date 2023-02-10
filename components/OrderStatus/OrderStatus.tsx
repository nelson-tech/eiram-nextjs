import { Order } from "@api/codegen/graphql"
import OrderCancelled from "./OrderCancelled"
import OrderFailed from "./OrderFailed"
import OrderOnHold from "./OrderOnHold"
import OrderPending from "./OrderPending"
import OrderProcessing from "./OrderProcessing"
import OrderRefunded from "./OrderRefunded"
import OrderTracking from "./OrderTracking"

type OrderStatusPropsType = {
	order: Order
}

const OrderStatus = ({ order }: OrderStatusPropsType) => {
	const orderDate = order?.date ? new Date(order.date).toLocaleDateString() : null

	const orderSteps = {
		PENDING: 1,
		PROCESSING: 2,
		COMPLETE: 3,
		ON_HOLD: 4,
		CANCELLED: 5,
		REFUNDED: 6,
		FAILED: 7,
		DRAFT: 8,
	}

	return (
		<div id="order-status" className="space-y-12">
			{order.tracking.number ? (
				<OrderTracking tracking={order.tracking} orderNumber={order.orderNumber} />
			) : order.status === "PENDING" ? (
				<OrderPending orderNumber={order.orderNumber} />
			) : order.status === "PROCESSING" ? (
				<OrderProcessing orderNumber={order.orderNumber} />
			) : order.status === "CANCELLED" ? (
				<OrderCancelled orderNumber={order.orderNumber} />
			) : order.status === "REFUNDED" ? (
				<OrderRefunded orderNumber={order.orderNumber} />
			) : order.status === "ON_HOLD" ? (
				<OrderOnHold orderNumber={order.orderNumber} />
			) : order.status === "FAILED" ? (
				<OrderFailed orderNumber={order.orderNumber} />
			) : (
				<div id="order-draft" />
			)}

			{orderSteps[order.status] < 4 && (
				<div className="border-t w-full border-gray-200 sm:pb-12">
					<h4 className="sr-only">Status</h4>

					<div className="pt-12 h-16" aria-hidden="true">
						<div className="overflow-hidden h-2 rounded-full bg-gray-200">
							<div
								className="h-2 rounded-full bg-accent"
								style={{ width: `calc((${orderSteps[order.status]} * 3 + 2) / 12 * 100%)` }}
							/>
						</div>
						<div className="mt-6 hidden grid-cols-4 text-sm font-medium text-gray-600 sm:grid">
							<div className="text-accent">Order placed</div>
							<div className={`${orderSteps[order.status] > 0 ? "text-accent" : ""} text-center`}>
								{orderSteps[order.status] > 1 ? "Payment Received" : "Awaiting Payment"}
							</div>
							<div className={`${orderSteps[order.status] > 1 ? "text-accent" : ""} text-center`}>
								Processing
							</div>
							<div className={`${orderSteps[order.status] > 2 ? "text-accent" : ""} text-right`}>
								Shipped
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default OrderStatus
