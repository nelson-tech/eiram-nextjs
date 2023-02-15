type OrderProcessingPropsType = {
	orderNumber: string | null | undefined
}

const OrderProcessing = ({ orderNumber }: OrderProcessingPropsType) => {
	return (
		<div id="order-processing" className="space-y-8">
			<p className="mt-2 text-2xl font-bold tracking-tight sm:text-4xl">
				We&apos;re working on your order!
			</p>
			<div className="mt-2 text-base text-gray-500">
				<p>
					Your order #{orderNumber} has been received and we&apos;re currently packaging your order.
				</p>
				<p className="mt-2 text-base text-gray-500">
					We&apos;ll email you as soon as your order ships.
				</p>
			</div>
		</div>
	)
}

export default OrderProcessing
