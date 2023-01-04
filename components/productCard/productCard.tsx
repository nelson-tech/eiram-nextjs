"use client"

import Image from "next/image"

import Link from "@components/Link"
import { Transition } from "@headlessui/react"
import formatCurrencyString from "@lib/utils/formatCurrencyString"
import { useState } from "react"

type ProductCardProps = {
	product: WC_ProductType
}

const ProductCard = ({ product }: ProductCardProps) => {
	const [isShowing, setIsShowing] = useState(false)

	return (
		<>
			<div
				className="group relative bg-white border border-gray-200 rounded-md w-full flex flex-col overflow-hidden"
				onMouseEnter={() => setIsShowing((isShowing) => !isShowing)}
				onMouseLeave={() => setIsShowing((isShowing) => !isShowing)}
			>
				{product.images[0]?.src && (
					<div className=" transition-all h-64">
						<div className="w-full h-64 object-center object-contain relative">
							<Transition
								show={!isShowing}
								as="div"
								className="unset-img aspect-square h-64 absolute object-contain"
								enter="transition-opacity duration-300"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="transition-opacity duration-300"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<Image
									src={product.images[0]?.src}
									alt={product.images[0]?.alt || ""}
									fill
									sizes="(max-width: 400px) 100vw,(max-width: 768px) 50vw,33vw"
									className="custom-img aspect-square"
								/>
							</Transition>
							<Transition
								show={isShowing}
								as="div"
								className="unset-img aspect-square h-64 absolute"
								enter="transition-opacity duration-300"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="transition-opacity duration-300"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<Image
									src={product.images[1]?.src}
									alt={product.images[1]?.alt || ""}
									fill
									sizes="(max-width: 400px) 100vw,(max-width: 768px) 50vw,33vw"
									className="custom-img"
								/>
							</Transition>
						</div>
					</div>
				)}

				<div className="flex-1 space-y-2 flex flex-col w-full">
					<h3 className="font-bold px-4 py-2 text-gray-900 group-hover:text-accent transition-all text-base sm:text-xl">
						<Link
							href={`/shop/${product.sku}`}
							title={product.name || ""}
							className="flex font-sans"
						>
							<span aria-hidden="true" className="absolute inset-0" />
							{product.name}
						</Link>
					</h3>
					{product.short_description && (
						<div
							className="text-sm text-gray-600 p-4"
							dangerouslySetInnerHTML={{ __html: product.short_description }}
						/>
					)}

					<div className="px-4 pb-2 flex-1 flex flex-col justify-end">
						{/*  <p className="text-sm italic text-gray-500">{product.options}</p> */}
						{product.on_sale && (
							<div className="flex">
								<span className="text-center items-center sm:hidden rounded-md bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800">
									SALE!
								</span>
							</div>
						)}
						<div className="flex">
							{product.on_sale && (
								<p className="text-sm text-gray-400 mr-2 line-through">
									{formatCurrencyString(product.prices.regular_price)}
								</p>
							)}
							<p className="text-sm font-medium text-gray-500 w-full">
								{formatCurrencyString(product.prices.price)}
							</p>
							{product.on_sale && (
								<span className="hidden sm:inline-flex items-center rounded-md bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800">
									SALE!
								</span>
							)}
						</div>
					</div>
					<div className="bg-white w-full border-t text-green-main py-2 transition-all text-center group-hover:bg-green-main group-hover:text-white">
						View Product
					</div>
				</div>
			</div>
		</>
	)
}

export default ProductCard
