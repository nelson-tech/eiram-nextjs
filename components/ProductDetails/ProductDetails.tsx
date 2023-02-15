"use client"

import { FormEvent, Fragment, useState } from "react"
import { Listbox, RadioGroup, Tab, Transition } from "@headlessui/react"
import ChevronUpDownIcon from "@heroicons/react/20/solid/ChevronUpDownIcon"
import CheckIcon from "@heroicons/react/20/solid/CheckIcon"

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
import Image from "components/Image"
import LoadingSpinner from "components/LoadingSpinner"
import InnerImageZoom from "components/InnerImageZoom"

type ProductDetailsProps = {
	product: Product & SimpleProduct & VariableProduct
}
const ProductDetails = ({ product }: ProductDetailsProps) => {
	const [quantity, setQuantity] = useState(1)
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
							if (
								varAttribute?.label?.toUpperCase() === attribute.toUpperCase() &&
								varAttribute.value?.toUpperCase() === value.toUpperCase()
							) {
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
			quantity,
			variationId,
		}

		if (productId) {
			await addToCart(input)
		}

		setLoading(false)
	}

	const images = [product?.image, ...(product?.galleryImages?.nodes ?? [])] as MediaItem[]

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
														alt={image.altText ?? ""}
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
												alt={image.altText ?? ""}
												zoomSrc={image.sourceUrl}
												width={image.mediaDetails?.width ?? 0}
												height={image.mediaDetails?.height ?? 0}
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

						{product.description && (
							<div
								className="space-y-6 text-base text-gray-700 wp-container border-b pb-8 border-gray-200"
								dangerouslySetInnerHTML={{ __html: product.description }}
							/>
						)}
					</div>

					<div className="mt-10 lg:col-span-5">
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
													onChange={(e: string) =>
														setSelectedAttributes({
															...selectedAttributes,
															[attribute.name as string]: e,
														})
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
							<div className="mt-10 grid grid-cols-3 items-center border-t pt-10">
								<div className="w-20 mx-auto">
									<Listbox value={quantity} onChange={setQuantity}>
										{({ open }) => (
											<div className="relative mr-2">
												<div className="flex items-center">
													<Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent sm:text-sm">
														<span className="block truncate">{quantity}</span>
														<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
															<ChevronUpDownIcon
																className="h-5 w-5 text-gray-400"
																aria-hidden="true"
															/>
														</span>
													</Listbox.Button>
												</div>

												<Transition
													show={open}
													as={Fragment}
													leave="transition ease-in duration-100"
													leaveFrom="opacity-100"
													leaveTo="opacity-0"
												>
													<Listbox.Options className="absolute z-10 mt-1 max-h-36 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
														{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number, i) => (
															<Listbox.Option
																key={"quantity" + i}
																className={({ active }) => `${
																	active ? "text-white bg-accent" : "text-gray-900"
																}
                        relative cursor-default select-none py-2 pl-3 pr-9
                      `}
																value={number}
															>
																{({ selected, active }) => (
																	<>
																		<span
																			className={`${
																				selected ? "font-semibold" : "font-normal"
																			} block truncate`}
																		>
																			{number}
																		</span>

																		{selected ? (
																			<span
																				className={`${active ? "text-white" : "text-accent"}
                              absolute inset-y-0 right-0 flex items-center pr-4`}
																			>
																				<CheckIcon className="h-5 w-5" aria-hidden="true" />
																			</span>
																		) : null}
																	</>
																)}
															</Listbox.Option>
														))}
													</Listbox.Options>
												</Transition>
											</div>
										)}
									</Listbox>
								</div>
								<div className="mr-4 col-span-2">
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
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductDetails
