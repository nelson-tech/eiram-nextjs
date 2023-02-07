"use client"

import { useState } from "react"
import Image from "next/image"

import useCart from "@lib/hooks/useCart"
import Link from "@components/Link"

import LoadingSpinner from "@components/LoadingSpinner"
import MinusIcon from "@icons/Minus"
import PlusIcon from "@icons/Plus"
import { TrashIcon } from "@heroicons/react/20/solid"
import { CartItem } from "@api/codegen/graphql"

type CartItemProps = {
	lineItem: CartItem
	closeModal?: () => void
}

const CartItem = ({ lineItem, closeModal }: CartItemProps) => {
	const {
		state: { updateLoading, removeLoading },
		updateItem,
		removeItem,
	} = useCart()

	let quantity = lineItem?.quantity

	const featuredImage = lineItem.product.node.image

	const handleQuantityUpdate = async (newQuantity?: number) => {
		// setQuantity(newQuantity)

		newQuantity && (quantity = newQuantity)

		if (quantity && lineItem?.key) {
			await updateItem({
				items: [
					{
						key: lineItem.key,

						quantity,
					},
				],
			})
		}
	}

	const handleRemoveItem = async (key: string) => {
		await removeItem({ keys: [lineItem.key] })
	}

	return (
		<div className="py-6 relative z-0">
			{lineItem && (
				<li className="flex items-center">
					{featuredImage && (
						<div
							className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 border border-gray-200 rounded-md overflow-hidden relative`}
						>
							<Image
								src={featuredImage.sourceUrl ?? ""}
								alt={featuredImage.altText ?? ""}
								fill
								className="object-cover"
								sizes="33vw"
							/>
						</div>
					)}

					<div className="ml-3 flex-1 flex flex-col mb-1 justify-between">
						<div className="flex justify-between items-center ">
							<h3 onClick={() => closeModal && closeModal()}>
								<Link
									href={`/shop/${lineItem?.product.node.slug}`}
									className="font-bold text-sm text-gray-900"
								>
									{lineItem?.product.node.name}
								</Link>
							</h3>
							<p className="ml-4 text-xs text-gray-500">{lineItem.total}</p>
						</div>
						<div className="flex gap-8 mt-4 text-sm text-gray-500">
							{lineItem?.variation?.attributes &&
								lineItem.variation.attributes.map((attribute, i) => (
									<div
										key={attribute.id}
										className=""
									>{`${attribute.label} - ${attribute.value}`}</div>
								))}
						</div>

						<div className="flex-1 flex items-center justify-between text-sm mt-4">
							{quantity && (
								<div
									className={
										"flex items-center space-x-2 text-xs text-gray-600 transition-opacity " +
										`${removeLoading?.itemKey === lineItem.key ? "opacity-0" : "opacity-100"}`
									}
								>
									<label htmlFor="quantity" className="pr-2">
										Quantity:{" "}
									</label>
									<div
										className="cursor-pointer py-2"
										onClick={() => {
											quantity &&
												updateLoading?.itemKey !== lineItem.key &&
												handleQuantityUpdate(quantity - 1)
										}}
									>
										<MinusIcon size={3} type="solid" />
									</div>

									{updateLoading?.itemKey === lineItem.key ? (
										<div className="w-16 flex justify-center items-center">
											<LoadingSpinner style="" size={4} />
										</div>
									) : (
										<input
											className="w-16 text-center border py-1 text-xs rounded outline-none focus:bg-white ring-transparent"
											value={quantity}
											id="quantity"
											name="quantity"
											type="number"
											min={1}
											onChange={async (e) => await handleQuantityUpdate(Number(e.target.value))}
										/>
									)}

									<div
										className="cursor-pointer py-2"
										onClick={() => {
											quantity &&
												updateLoading?.itemKey !== lineItem.key &&
												handleQuantityUpdate(quantity + 1)
										}}
									>
										<PlusIcon size={3} type="solid" />
									</div>
									{/* {quantity} */}
								</div>
							)}

							<div className="">
								{removeLoading?.itemKey === lineItem.key ? (
									<LoadingSpinner style="mr-4" size={4} />
								) : (
									<button
										type="button"
										title="Remove"
										className="text-accent hover:text-red-main transition-all"
										onClick={async () => lineItem?.key && (await handleRemoveItem(lineItem.key))}
									>
										<TrashIcon className="h-5 w-5" />
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
