import { LineItem, VariationAttribute } from "@api/codegen/graphql"
import { ChevronRightIcon } from "@heroicons/react/20/solid"
import formatCurrencyString from "@lib/utils/formatCurrencyString"
import Image from "next/image"

type OrderLineItemInputType = {
	lineItem: LineItem
}

const OrderLineItem = ({ lineItem }: OrderLineItemInputType) => {
	const quantity = lineItem?.quantity

	const price = formatCurrencyString((parseFloat(lineItem.subtotal) * 100).toString())

	const total = formatCurrencyString(
		(parseFloat(lineItem.total) * lineItem.quantity * 100).toString(),
	)

	const product = lineItem?.product.node

	const productImage = lineItem?.product?.node?.image

	return (
		<li>
			<div className="flex items-center px-2 py-4 sm:px-6">
				<div className="flex min-w-0 flex-1 items-center">
					<div className="flex-shrink-0">
						<div className="w-14 h-14 sm:w-16 sm:h-16 object-center object-contain rounded overflow-hidden mr-2 sm:mr-4 lg:mr-6 relative">
							<Image
								src={productImage?.sourceUrl}
								alt={productImage?.altText}
								width={productImage?.mediaDetails.width}
								height={productImage?.mediaDetails.height}
								className="object-contain"
								sizes="33vw"
							/>
						</div>
					</div>
					<div className="min-w-0 flex-1 px-4 grid sm:grid-cols-2 gap-4">
						<div className="">
							<p className=" text-sm font-medium text-accent">{lineItem?.product?.node?.name}</p>
							<p className="mt-2 items-center text-sm text-gray-500">
								{lineItem.variation?.node?.attributes?.nodes.map(
									(variation: VariationAttribute) => (
										<div key={variation.id}>
											{variation.label}: {variation.value}
										</div>
									),
								)}
							</p>
						</div>
						<div className="">
							<div>
								<p className="text-sm text-gray-500">Quantity: {lineItem.quantity}</p>
								<p className="mt-2 flex items-center text-sm text-gray-500">Total: {total}</p>
							</div>
						</div>
					</div>
					<td className="py-6 font-medium text-right whitespace-nowrap">
						<a href={`/shop/${product.slug}`} className="text-accent">
							<ChevronRightIcon className="h-8 w-8" />
							<span className="sr-only">, {product.name}</span>
						</a>
					</td>
				</div>
			</div>
		</li>
	)
}

export default OrderLineItem
