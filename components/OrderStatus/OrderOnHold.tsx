type OrderOnHoldPropsType = {
	orderNumber: string
}

const OrderOnHold = ({ orderNumber }: OrderOnHoldPropsType) => {
	return (
		<div id="order-on-hold" className="space-y-8">
			<p className="mt-2 text-2xl font-bold tracking-tight sm:text-4xl">Your order is on hold.</p>
			<div className="mt-2 text-base text-gray-500">
				<p className="text-base text-gray-500 bg-yellow-50 rounded-md p-4 mt-8">
					If you think there&apos;s been a mistake, please{" "}
					<a
						href={`mailto:info@eiramknitwear.com?Subject=On-Hold%20Issue%20for%20Order%20#${orderNumber}`}
						className="underline text-accent hover:text-accent transition-colors"
					>
						contact us
					</a>{" "}
					with your order number (#{orderNumber}) and we&apos;ll work with you to correct it.
				</p>
			</div>
		</div>
	)
}

export default OrderOnHold
