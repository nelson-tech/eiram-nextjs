import { ChevronRightIcon } from "@heroicons/react/20/solid"
import formatCurrencyString from "@lib/utils/formatCurrencyString"
import Image from "next/image"

type OrderLineItemInputType = {
	lineItem: WC_Order["line_items"][0]
}

const OrderLineItem = ({ lineItem }: OrderLineItemInputType) => {
	const quantity = lineItem?.quantity

	const price = formatCurrencyString((lineItem.price * 100).toString())

	const total = formatCurrencyString((lineItem.price * lineItem.quantity * 100).toString())

	return (
		<li>
			<div className="flex items-center px-2 py-4 sm:px-6">
				<div className="flex min-w-0 flex-1 items-center">
					<div className="flex-shrink-0">
						<div className="w-14 h-14 sm:w-16 sm:h-16 object-center object-contain rounded overflow-hidden mr-2 sm:mr-4 lg:mr-6 relative">
							<Image src={lineItem.image.src} alt="" fill className="object-contain" sizes="33vw" />
						</div>
					</div>
					<div className="min-w-0 flex-1 px-4 grid sm:grid-cols-2 gap-4">
						<div className="">
							<p className=" text-sm font-medium text-accent">
								{lineItem.parent_name ?? lineItem.name}
							</p>
							<p className="mt-2 items-center text-sm text-gray-500">
								{lineItem.meta_data.map((meta) => (
									<div key={meta.id}>
										{meta.display_key}: {meta.display_value}
									</div>
								))}
							</p>
						</div>
						<div className="">
							<div>
								<p className="text-sm text-gray-500">Quantity: {lineItem.quantity}</p>
								<p className="mt-2 flex items-center text-sm text-gray-500">Total: {total}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</li>
	)
}

export default OrderLineItem
