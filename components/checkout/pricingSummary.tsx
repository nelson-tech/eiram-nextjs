import formatCurrencyString from "@lib/utils/formatCurrencyString"

type PricingSummaryProps = {
	cart: WC_CartType
}

const PricingSummary = ({ cart }: PricingSummaryProps) => {
	return (
		<dl className="text-sm font-medium text-gray-500 mt-10 space-y-6">
			<div className="flex justify-between">
				<dt>Subtotal</dt>
				<dd className="text-gray-900">{formatCurrencyString(cart?.totals.total_items)}</dd>
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
				<dd className="text-gray-900">{formatCurrencyString(cart?.totals.total_tax)}</dd>
			</div>
			<div className="flex justify-between">
				<dt>Shipping</dt>
				<dd className="text-gray-900">{formatCurrencyString(cart?.totals.total_shipping)}</dd>
			</div>

			<div className="flex items-center justify-between border-t border-gray-200 text-gray-900 pt-6">
				<dt>Total</dt>
				<dd className="text-base">{formatCurrencyString(cart?.totals.total_price)}</dd>
			</div>
		</dl>
	)
}

export default PricingSummary
