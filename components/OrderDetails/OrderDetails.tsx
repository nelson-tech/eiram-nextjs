import { LineItem, Order } from "@api/codegen/graphql"
import OrderLineItem from "@components/OrderLineItem"
import OrderStatus from "../OrderStatus"

type OrderDetailsInputType = {
	order: Order
}

const OrderDetails = ({ order }: OrderDetailsInputType) => {
	return (
		<div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
			<OrderStatus order={order} />

			<div className="mt-10 border-t border-gray-200">
				<h2 className="sr-only">Your order</h2>

				<h3 className="sr-only">Items</h3>
				<div className="border-b  border-gray-200">
					{order.lineItems.nodes.map((lineItem: LineItem) => (
						<OrderLineItem key={lineItem.product.node.id} lineItem={lineItem} />
					))}
				</div>

				<div className="sm:ml-40 sm:pl-6">
					<h3 className="sr-only">Your information</h3>

					<h4 className="sr-only">Addresses</h4>
					<dl className="grid grid-cols-2 gap-x-6 py-10 text-sm">
						{order.hasShippingAddress && (
							<div>
								<dt className="font-medium text-gray-900">Shipping address</dt>
								<dd className="mt-2 text-gray-700">
									<address className="not-italic">
										<span className="block">
											{order.shipping.firstName} {order.shipping.lastName}
										</span>
										<span className="block">{order.shipping.address1}</span>
										{order.shipping.address2 && (
											<span className="block">{order.shipping.address2}</span>
										)}
										<span className="block">
											{order.shipping.city}, {order.shipping.state} {order.shipping.country}{" "}
											{order.shipping.postcode}
										</span>
									</address>
								</dd>
							</div>
						)}
						{order.hasBillingAddress && (
							<div>
								<dt className="font-medium text-gray-900">
									{order.hasShippingAddress ? "Billing address" : "Billing and Shipping address"}
								</dt>
								<dd className="mt-2 text-gray-700">
									<address className="not-italic">
										<span className="block">{`${order.billing.firstName} ${order.billing.lastName}`}</span>
										<span className="block">{order.billing.address1}</span>
										{order.billing.address2 && (
											<span className="block">{order.billing.address2}</span>
										)}
										<span className="block">
											{order.billing.city}, {order.billing.state} {order.billing.country}{" "}
											{order.billing.postcode}
										</span>
									</address>
								</dd>
							</div>
						)}
					</dl>

					<h3 className="sr-only">Summary</h3>

					<dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">
						{order.subtotal !== order.total && (
							<div className="flex justify-between">
								<dt className="font-medium text-gray-900">Subtotal</dt>
								<dd className="text-gray-700">{order.subtotal}</dd>
							</div>
						)}
						{order.discountTotal !== "$0.00" && (
							<div className="flex justify-between">
								<dt className="flex font-medium text-gray-900">Discount</dt>
								<dd className="text-gray-700">{order.discountTotal}</dd>
							</div>
						)}
						{order.shippingTotal !== "$0.00" && (
							<div className="flex justify-between">
								<dt className="font-medium text-gray-900">Shipping</dt>
								<dd className="text-gray-700">{order.shippingTotal}</dd>
							</div>
						)}
						<div className="flex justify-between">
							<dt className="font-medium text-gray-900">Total</dt>
							<dd className="text-gray-900">{order.total}</dd>
						</div>
					</dl>
				</div>
			</div>
		</div>
	)
}

export default OrderDetails
