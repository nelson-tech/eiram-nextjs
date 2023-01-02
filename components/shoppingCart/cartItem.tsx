"use client"

import { useState } from "react"
import Image from "next/image"

import useCart from "@lib/hooks/useCart"
import Link from "@components/Link"
import formatCurrencyString from "@lib/utils/formatCurrencyString"

import LoadingSpinner from "@components/LoadingSpinner"
import MinusIcon from "@icons/Minus"
import PlusIcon from "@icons/Plus"

type CartItemProps = {
	lineItem: WC_CartType["items"][0]
	closeModal?: () => void
}

const CartItem = ({ lineItem, closeModal }: CartItemProps) => {
	const [loading, setLoading] = useState(false)
	const { itemLoading, send } = useCart()

	let quantity = lineItem?.quantity
	let variations = lineItem.variation

	const featuredImage = lineItem.images[0]

	const total = formatCurrencyString(lineItem.totals.line_subtotal)

	const handleQuantityUpdate = async (newQuantity?: number) => {
		// setQuantity(newQuantity)

		newQuantity && (quantity = newQuantity)

		if (quantity && lineItem?.key) {
			const data = await send("UPDATEITEM", {
				itemKey: lineItem.key,
				quantity,
			})
		}
	}

	const handleRemoveItem = async (key: string) => {
		setLoading(true)
		const data = await send("REMOVEITEM", {
			itemKey: lineItem.key,
		})
	}

	return (
		<div className="py-6 relative z-0">
			{lineItem && (
				<li className="flex items-center">
					{featuredImage && (
						<div
							className={`flex-shrink-0 w-16 h-16 md:w-24 md:h-24 border border-gray-200 rounded-md overflow-hidden relative`}
						>
							<Image
								src={featuredImage.src || ""}
								alt={(featuredImage.alt ?? featuredImage.name) || ""}
								fill
								className="object-contain"
								sizes="33vw"
							/>
						</div>
					)}

					<div className="ml-4 flex-1 flex flex-col mb-1 justify-between">
						<div className="flex justify-between items-center ">
							<h3 onClick={() => closeModal && closeModal()}>
								<Link href={`/shop/${lineItem?.sku}`} className="font-bold text-sm text-gray-900">
									{lineItem?.name}
								</Link>
							</h3>
							<p className="ml-4 text-xs text-gray-500">{total}</p>
						</div>
						<div className="flex gap-8 mt-1 text-sm text-gray-500">
							{
								variations &&
									variations.map((attribute, i) => (
										<div
											key={attribute.attribute + i}
											className=""
										>{`${attribute.attribute} - ${attribute.value}`}</div>
									))
								// lineItem.meta.variation.map((attribute, i) => (
								// 	<div
								// 		key={attribute.id}
								// 		className=""
								// 	>{`${attribute?.label} - ${attribute?.value}`}</div>
								// ))
							}
						</div>

						<div className="flex-1 flex items-center justify-between text-sm mt-3">
							{quantity && (
								<div className="flex items-center space-x-2 text-xs text-gray-600">
									<label htmlFor="quantity" className="pr-2">
										Quantity:{" "}
									</label>
									<div
										className="cursor-pointer py-2"
										onClick={() => {
											quantity && handleQuantityUpdate(quantity - 1)
										}}
									>
										<MinusIcon size={3} type="solid" />
									</div>

									<input
										className="w-16 text-center border py-1 text-xs rounded outline-none focus:bg-white ring-transparent"
										value={quantity}
										id="quantity"
										name="quantity"
										type="number"
										min={1}
										onChange={async (e) => await handleQuantityUpdate(Number(e.target.value))}
									/>

									<div
										className="cursor-pointer py-2"
										onClick={() => {
											quantity && handleQuantityUpdate(quantity + 1)
										}}
									>
										<PlusIcon size={3} type="solid" />
									</div>
									{/* {quantity} */}
								</div>
							)}

							<div className="">
								{loading || itemLoading?.itemKey === lineItem.key ? (
									<LoadingSpinner style="mr-4" size={4} />
								) : (
									<button
										type="button"
										title="Remove"
										className="font-medium text-accent hover:text-red transition"
										onClick={async () => lineItem?.key && (await handleRemoveItem(lineItem.key))}
									>
										Remove
									</button>
								)}
							</div>
						</div>
					</div>
				</li>
			)}
		</div>
	)
}

export default CartItem
