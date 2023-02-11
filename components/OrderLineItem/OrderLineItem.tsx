"use client"

import {
	AddToCartInput,
	LineItem,
	Product,
	SimpleProduct,
	VariableProduct,
	VariationAttribute,
} from "@api/codegen/graphql"
import Link from "components/Link"
import LoadingSpinner from "components/LoadingSpinner"
import useCart from "@lib/hooks/useCart"
import formatCurrencyString from "@lib/utils/formatCurrencyString"
import Image from "components/Image"

type OrderLineItemInputType = {
	lineItem: LineItem
}

const OrderLineItem = ({ lineItem }: OrderLineItemInputType) => {
	const { addToCart, state } = useCart()

	const total = formatCurrencyString(
		(parseFloat(lineItem.total) * lineItem.quantity * 100).toString(),
	)

	const product = lineItem?.product?.node as Product & SimpleProduct & VariableProduct

	const image = product?.image

	return (
		<>
			<div className="flex py-6 sm:py-12">
				<div className="min-w-0 flex-1 lg:flex lg:flex-col">
					<div className="lg:flex-1">
						<div className="sm:flex justify-between">
							<div>
								<h4 className="font-medium text-gray-900">{product?.name}</h4>
								{product?.shortDescription && (
									<div
										className="mt-2 hidden text-sm text-gray-500 sm:block"
										dangerouslySetInnerHTML={{ __html: product.shortDescription }}
									/>
								)}
								<div className="">
									{lineItem.variation?.node?.attributes?.nodes && (
										<p className="mt-2 items-center text-sm text-gray-500">
											{" "}
											{lineItem.variation.node.attributes.nodes.map(
												(variation: VariationAttribute) => (
													<div key={variation.id}>
														{variation.label}: {variation.value}
													</div>
												),
											)}
										</p>
									)}
								</div>
							</div>
							<p className="mt-1 font-medium text-gray-900 sm:mt-0 sm:ml-6">{total}</p>
						</div>
						<div className="mt-2 flex text-sm font-medium sm:mt-4">
							{product?.slug && (
								<Link
									href={`/shop/${product.slug}`}
									title="View product page"
									className="text-accent hover:text-highlight transition-colors"
								>
									View Product
								</Link>
							)}
							<div className="ml-6 border-l border-gray-200 pl-6 sm:ml-[33px] sm:pl-8">
								{state.loading ? (
									<div className="w-16 flex justify-center items-center">
										<LoadingSpinner style="" size={5} />
									</div>
								) : (
									<div
										onClick={() => {
											const input: AddToCartInput = {
												productId: product.databaseId,
												variationId: lineItem.variationId,
											}
											addToCart(input)
										}}
										className="cursor-pointer text-accent hover:text-highlight transition-colors"
									>
										Buy Again
									</div>
								)}
							</div>
						</div>
					</div>
					<div className="mt-6 flex flex-1 items-end">
						<dl className="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">
							<div className="flex">
								<dt className="font-medium text-gray-900">Price</dt>
								<dd className="ml-2 text-gray-700">{product?.price}</dd>
							</div>
							<div className="flex pl-4 sm:pl-6">
								<dt className="font-medium text-gray-900">Quantity</dt>
								<dd className="ml-2 text-gray-700">{lineItem.quantity}</dd>
							</div>
						</dl>
					</div>
				</div>
				<div className="ml-4 flex-shrink-0 sm:order-first sm:m-0 sm:mr-6">
					<div className="col-start-2 col-end-3 h-20 w-20 rounded-lg object-cover object-center sm:col-start-1 sm:row-span-2 sm:row-start-1 sm:h-40 sm:w-40 lg:h-52 lg:w-52">
						{image?.sourceUrl && (
							<Image
								src={image.sourceUrl}
								alt={image.altText}
								width={image.mediaDetails.width}
								height={image.mediaDetails.height}
							/>
						)}
					</div>
				</div>
			</div>
		</>
		// <div className="flex space-x-6 border-b border-gray-200 py-10">
		// 	<div className="h-20 w-20 flex-none rounded-lg bg-gray-100 object-cover object-center sm:h-40 sm:w-40">
		// 		<Image
		// 			src={image.sourceUrl}
		// 			alt={image.altText}
		// 			width={image.mediaDetails.width}
		// 			height={image.mediaDetails.height}
		// 		/>
		// 	</div>
		// 	<div className="flex flex-auto flex-col">
		// 		<div>
		// 			<h4 className="font-medium text-gray-900">
		// 				<Link href={`/shop/${product.slug}`} title="View product page">
		// 					{product.name}
		// 				</Link>
		// 			</h4>
		// 			<div
		// 				className="mt-2 text-sm text-gray-600"
		// 				dangerouslySetInnerHTML={{ __html: product.shortDescription }}
		// 			/>

		// 		</div>
		// 		<div className="mt-6 flex flex-1 items-end">
		// 			<dl className="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">
		// 				<div className="flex">
		// 					<dt className="font-medium text-gray-900">Quantity</dt>
		// 					<dd className="ml-2 text-gray-700">{lineItem.quantity}</dd>
		// 				</div>
		// 				<div className="flex pl-4 sm:pl-6">
		// 					<dt className="font-medium text-gray-900">Price</dt>
		// 					<dd className="ml-2 text-gray-700">{total}</dd>
		// 				</div>
		// 			</dl>
		// 		</div>
		// 	</div>
		// </div>
	)
}

export default OrderLineItem
