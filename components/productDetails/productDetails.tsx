"use client"

import { FormEvent, useState } from "react"
import Image from "components/Image"
import { RadioGroup, Tab } from "@headlessui/react"

import {
	AddToCartInput,
	MediaItem,
	Product,
	ProductAttribute,
	ProductVariation,
	SimpleProduct,
	VariableProduct,
	VariationAttribute,
} from "@api/codegen/graphql"
import useCart from "@lib/hooks/useCart"

import Link from "components/Link"
import LoadingSpinner from "components/LoadingSpinner"
import InnerImageZoom from "components/InnerImageZoom"

type ProductDetailsProps = {
	product: Product & SimpleProduct & VariableProduct
}
const ProductDetails = ({ product }: ProductDetailsProps) => {
	const {
		state: { loading: processing },
		addToCart,
	} = useCart()

	const attributes = product.attributes?.nodes

	const [loading, setLoading] = useState(false)
	const [selectedAttributes, setSelectedAttributes] = useState<{ [key: string]: string }>({})

	const readyToAdd =
		product.type === "SIMPLE"
			? true
			: Object.keys(selectedAttributes).length === product.attributes?.nodes.length

	function classs(...classes: string[]) {
		return classes.filter(Boolean).join(" ")
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		setLoading(true)

		const variations = product.variations?.nodes

		const productId = product.databaseId

		let variationId = null

		if (variations) {
			const matchedVariation = (variations as ProductVariation[]).find(
				(variation: ProductVariation) => {
					let matches = 0
					Object.entries(selectedAttributes).map(([attribute, value]) => {
						variation?.attributes?.nodes?.filter((varAttribute: VariationAttribute) => {
							if (varAttribute?.label === attribute && varAttribute.value === value) {
								matches++
							}
						})
					})

					return matches === attributes?.length
				},
			)
			matchedVariation && (variationId = matchedVariation?.databaseId)
		}

		const input: AddToCartInput = {
			productId,
			quantity: 1,
			variationId,
		}

		if (productId) {
			await addToCart(input)
		}

		setLoading(false)
	}

	const images = [product?.image, ...product?.galleryImages?.nodes] as MediaItem[]

	return (
		<div className="mx-auto max-w-2xl lg:max-w-none">
			<div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
				{/* <!-- Image Gallery --> */}
				{images && (
					<Tab.Group as="div" className="flex flex-col-reverse">
						{/* <!-- Image selector --> */}
						<div className="mx-auto mt-6 px-8 sm:px-0 w-full max-w-2xl sm:block lg:max-w-none">
							<Tab.List className="grid grid-cols-3 sm:grid-cols-4 gap-6">
								{images.map(
									(image: MediaItem, i) =>
										image.sourceUrl && (
											<Tab
												key={image.id + "thumbs"}
												className="relative flex h-24 aspect-square cursor-pointer items-center justify-center rounded-md focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-accent focus:ring-offset-4"
											>
												<span className="sr-only"> {image.altText} </span>
												<span className="absolute inset-0 overflow-hidden rounded-md">
													<Image
														src={image.sourceUrl}
														alt={image.altText}
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
							{images.map(
								(image: MediaItem, i) =>
									image.sourceUrl && (
										<Tab.Panel key={image.id + "main"}>
											<InnerImageZoom
												src={image.sourceUrl}
												alt={image.altText}
												zoomSrc={image.sourceUrl}
												width={image.mediaDetails.width}
												height={image.mediaDetails.height}
												className="rounded-md"
											/>
										</Tab.Panel>
									),
							)}
						</Tab.Panels>
					</Tab.Group>
				)}

				{/* <!-- Product Info --> */}
				<div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
					{product.onSale && (
						<span className="inline-flex items-center rounded-md bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800">
							SALE!
						</span>
					)}
					<h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>

					<div className="mt-3 flex items-center">
						<h2 className="sr-only">Product information</h2>
						{product.onSale && (
							<p className="text-2xl tracking-tight text-gray-400 line-through mr-2">
								{product.regularPrice}
							</p>
						)}
						<p className="text-3xl tracking-tight text-gray-500">{product.price}</p>
					</div>

					<div className="mt-6">
						<h3 className="sr-only">Description</h3>

						<div
							className="space-y-6 text-base text-gray-700 wp-container border-b pb-8 border-gray-200"
							dangerouslySetInnerHTML={{ __html: product.description }}
						/>
					</div>

					<div className="mt-8 lg:col-span-5">
						<form onSubmit={handleSubmit}>
							{attributes &&
								attributes.map((attribute: ProductAttribute) => {
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
													onChange={(e) =>
														setSelectedAttributes({ ...selectedAttributes, [attribute.name]: e })
													}
													className="mt-2"
												>
													<RadioGroup.Label className="sr-only">
														Choose a {attribute.name}
													</RadioGroup.Label>
													<div className="flex items-center space-x-3">
														{attribute.options &&
															attribute.options.length > 0 &&
															attribute.options.map((option, i) => (
																<RadioGroup.Option
																	key={attribute.id + i + option + "option"}
																	value={option}
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
																	<RadioGroup.Label as="span">{option}</RadioGroup.Label>
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
									className={`relative flex uppercase transition items-center justify-center rounded-sm border border-transparent ${
										readyToAdd && !processing
											? "bg-accent hover:bg-highlight"
											: " bg-gray-300 cursor-not-allowed"
									} text-white py-3 px-8 text-base font-medium focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-gray-50 w-full`}
									disabled={!readyToAdd || processing}
									title={readyToAdd ? "Add to bag" : "Select your options before adding to bag"}
								>
									{(loading || processing) && (
										<div className="absolute left-0 ml-6">
											<LoadingSpinner size={6} color="white" />
										</div>
									)}
									Add to bag
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductDetails
