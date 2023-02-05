import { Cart } from "@api/codegen/graphql"

type PricingSummaryProps = {
	cart: Cart
}

const PricingSummary = ({ cart }: PricingSummaryProps) => {
	return (
		<dl className="text-sm font-medium text-gray-500 mt-10 space-y-6">
			<div className="flex justify-between">
				<dt>Subtotal</dt>
				<dd className="text-gray-900">{cart?.subtotal}</dd>
			</div>
			{/* {cart?.coupons && (
				<div className="flex justify-between">
					<dt className="flex">
						Discount
						<span className="ml-2 rounded-full bg-gray-200 text-xs text-gray-600 py-0.5 px-2 tracking-wide">
							{cart.coupons.map((coupon) => coupon.code)}
						</span>
					</dt>

					<dd className="text-gray-900">-{cart?.totals.discount_total}</dd>
				</div>
			)} */}

			<div className="flex justify-between">
				<dt>Taxes</dt>
				<dd className="text-gray-900">{cart.totalTax}</dd>
			</div>
			<div className="flex justify-between">
				<dt>Shipping</dt>
				<dd className="text-gray-900">{cart.shippingTotal}</dd>
			</div>

			<div className="flex items-center justify-between border-t border-gray-200 text-gray-900 pt-6">
				<dt>Total</dt>
				<dd className="text-base">{cart.total}</dd>
			</div>
		</dl>
	)
}

export default PricingSummary
