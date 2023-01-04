"use client"

import { FormEvent, useState } from "react"
import Image from "next/image"
import { RadioGroup, Tab } from "@headlessui/react"

import useCart from "@lib/hooks/useCart"
import formatCurrencyString from "@lib/utils/formatCurrencyString"
import Link from "@components/Link"

import LoadingSpinner from "@components/LoadingSpinner"
import ImageMagnifier from "@components/ImageMagnifier"

type ProductDetailsProps = {
	product: WC_ProductType
}
const ProductDetails = ({ product }: ProductDetailsProps) => {
	const {
		state: { loading: processing },
		addToCart,
	} = useCart()

	const [loading, setLoading] = useState(false)
	const [selectedAttributes, setSelectedAttribute] = useState<{ [key: string]: string }>({})

	function classs(...classes: string[]) {
		return classes.filter(Boolean).join(" ")
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		setLoading(true)

		let productId = product.id

		const variation = Object.entries(selectedAttributes).map(([key, value]) => ({
			attribute: key,
			value,
		}))

		if (productId) {
			const input: WC_Cart_AddToCartInputType = {
				id: productId.toString(),
				quantity: "1",
				variation,
			}

			await addToCart(input)
		}

		setLoading(false)
	}

	return (
		<div className="mx-auto max-w-2xl lg:max-w-none">
			<div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
				{/* <!-- Image Gallery --> */}
				{product.images && (
					<Tab.Group as="div" className="flex flex-col-reverse">
						{/* <!-- Image selector --> */}
						<div className="mx-auto mt-6 px-8 sm:px-0 w-full max-w-2xl sm:block lg:max-w-none">
							<Tab.List className="grid grid-cols-4 gap-6">
								{product.images.map(
									(image, i) =>
										image.src && (
											<Tab
												key={image.src + i + "thumbs"}
												className="relative flex h-24 cursor-pointer items-center justify-center rounded-md focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-accent focus:ring-offset-4"
											>
												<span className="sr-only"> {image.alt} </span>
												<span className="absolute inset-0 overflow-hidden rounded-md">
													<Image
														src={image.src}
														alt={image.alt}
														fill
														sizes="33vw"
														className="h-full w-full object-cover object-center"
													/>
												</span>
												<span
													className={classs(
														"ring-transparent",
														"pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2",
													)}
													aria-hidden="true"
												/>
											</Tab>
										),
								)}
							</Tab.List>
						</div>

						<Tab.Panels className=" aspect-square object-contain w-full relative" as="div">
							{product.images.map(
								(image, i) =>
									image.src && (
										<Tab.Panel key={i + image.src + "main"}>
											<ImageMagnifier
												src={image.src}
												zoomLevel={2}
												magnifieWidth={350}
												magnifierHeight={350}
											/>
										</Tab.Panel>
									),
							)}
						</Tab.Panels>
					</Tab.Group>
				)}

				{/* <!-- Product Info --> */}
				<div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
					{product.on_sale && (
						<span className="inline-flex items-center rounded-md bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800">
							SALE!
						</span>
					)}
					<h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>

					<div className="mt-3 flex items-center">
						<h2 className="sr-only">Product information</h2>
						{product.on_sale && (
							<p className="text-2xl tracking-tight text-gray-400 line-through mr-2">
								{formatCurrencyString(product.prices.regular_price)}
							</p>
						)}
						<p className="text-3xl tracking-tight text-gray-500">
							{formatCurrencyString(product.prices.price)}
						</p>
					</div>

					{/* <!-- Reviews --> */}
					{/* <div className="mt-3">
      <h3 className="sr-only">Reviews</h3>
      <div className="flex items-center">
        <div className="flex items-center">
          {#each [0, 1, 2, 3, 4] as rating}<StarIcon
              key={rating}
              className={classNames(
                product.rating > rating ? "text-indigo-500" : "text-gray-300",
                "h-5 w-5 flex-shrink-0",
              )}
              aria-hidden="true"
            />
          {/each}
        </div>
        <p className="sr-only">{product.rating} out of 5 stars</p>
      </div>
    </div>  */}

					<div className="mt-6">
						<h3 className="sr-only">Description</h3>

						<div
							className="space-y-6 text-base text-gray-700 wp-container border-b pb-8 border-gray-200"
							dangerouslySetInnerHTML={{ __html: product.description }}
						/>
					</div>

					<div className="mt-8 lg:col-span-5">
						<form onSubmit={handleSubmit}>
							{product.attributes &&
								product.attributes.length > 0 &&
								product.attributes.map((attribute) => {
									return (
										attribute.name && (
											<div className="mb-8" key={attribute.name + attribute.id + "attribute"}>
												<div className="flex items-center justify-between">
													<h2 className="text-sm font-medium text-gray-900">{attribute.name}</h2>
													{["size", "sizes"].includes(attribute.name.toLowerCase()) && (
														<Link
															href="/size-conversion"
															className="text-sm font-medium text-accent-dark hover:text-accent"
														>
															See sizing chart
														</Link>
													)}
												</div>

												<RadioGroup
													value={selectedAttributes[attribute.name]}
													onChange={(e) => {
														setSelectedAttribute({
															...selectedAttributes,
															[attribute.name || ""]: e,
														})
													}}
													className="mt-2"
												>
													<RadioGroup.Label className="sr-only">
														Choose a {attribute.name}
													</RadioGroup.Label>
													<div className="flex items-center space-x-3">
														{attribute.terms &&
															attribute.terms.length > 0 &&
															attribute.terms.map((option, i) => (
																<RadioGroup.Option
																	key={option.id + i + option.name}
																	value={option.slug}
																	className={({ active, checked }) =>
																		classs(
																			true
																				? "cursor-pointer focus:outline-none"
																				: "opacity-25 cursor-not-allowed",
																			checked
																				? "bg-accent-dark border-transparent text-white hover:bg-accent-dark"
																				: "bg-white border-gray-200 text-gray-900 hover:bg-accent hover:text-white",
																			"border rounded-sm py-3 px-3 flex items-center justify-center transition text-sm font-medium uppercase flex-1",
																		)
																	}
																	disabled={false}
																>
																	<RadioGroup.Label as="span">{option.name}</RadioGroup.Label>
																</RadioGroup.Option>
															))}
													</div>
												</RadioGroup>
											</div>
										)
									)
								})}

							<div className="mt-10 flex">
								<button
									type="submit"
									className="relative flex uppercase transition items-center justify-center rounded-sm border border-transparent bg-accent py-3 px-8 text-base font-medium text-white hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-gray-50 w-full"
								>
									{(loading || processing) && (
										<div className="absolute left-0 ml-6">
											<LoadingSpinner size={6} color="white" />
										</div>
									)}
									Add to bag
								</button>

								{/* <button
          type="button"
          className="ml-4 flex items-center justify-center rounded-md py-3 px-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
        >
          <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
          <span className="sr-only">Add to favorites</span>
        </button> */}
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductDetails
