"use client"

import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"

import useCart from "@lib/hooks/useCart"
import Link from "@components/Link"
import formatCurrencyString from "@lib/utils/formatCurrencyString"

import CartItem from "./cartItem"
import LoadingSpinner from "@components/LoadingSpinner"
import ArrowRightIcon from "@icons/ArrowRight"
import XIcon from "@icons/X"

type ShoppingCartProps = {
	closeModal: () => void
}

const ShoppingCart = ({ closeModal }: ShoppingCartProps) => {
	const { cart, loading } = useCart().state

	const handleClearCart = async () => {
		// await clearCart()
		// TODO - Handle error case
	}

	return (
		<Dialog.Panel className="fixed inset-y-0 right-0 md:max-w-full flex max-w-[350px] sm:max-w-lg">
			<Transition.Child
				as={Fragment}
				enter="transform transition ease-in-out duration-300"
				enterFrom="translate-x-full"
				enterTo="translate-x-0"
				leave="transform transition ease-in-out duration-300"
				leaveFrom="translate-x-0"
				leaveTo="translate-x-full"
			>
				<div className="w-screen max-w-md relative">
					{loading && (
						<div className="absolute z-40 w-full h-full items-center justify-center flex bg-black bg-opacity-10 transition">
							<LoadingSpinner size={24} />
						</div>
					)}

					<div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
						<div className="flex-1 py-6 overflow-y-auto px-2">
							<div className="flex items-start justify-between">
								<Dialog.Title className="text-lg font-extrabold text-gray-900 pl-2">
									Shopping Cart
								</Dialog.Title>
								<div className="ml-3 h-7 flex items-center">
									<button
										type="button"
										className="-m-1 p-2 text-gray-400 hover:text-red-main outline-none ring-transparent"
										onClick={() => closeModal && closeModal()}
									>
										<span className="sr-only">Close panel</span>
										<XIcon size={6} />
									</button>
								</div>
							</div>
							<div className="mt-8 h-full p-2">
								<div className="flow-root h-full">
									{cart?.contents?.nodes && cart.contents.nodes.length > 0 ? (
										<ul className="-my-6 divide-y divide-gray-200 px-2">
											{cart.contents.nodes.map(
												(lineItem) =>
													lineItem && (
														<CartItem
															lineItem={lineItem}
															closeModal={closeModal}
															key={lineItem.key}
														/>
													),
											)}
										</ul>
									) : (
										<div className="text-gray-600 h-full">
											<div className=" font-bold">Your cart is empty...</div>
											<div className="mt-8 h-full">
												<Link
													href="/shop"
													className="text-gray-800 h-full transition hover:text-green-main font-bold flex justify-center items-center"
													onClick={() => closeModal && closeModal()}
												>
													Visit our shop!
													<ArrowRightIcon size={4} type="solid" styling="text-highlight ml-2" />
												</Link>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>

						<div
							className={`border-t border-gray-200 py-6 px-4 sm:px-6${
								cart?.contents.itemCount < 1 && " hidden"
							}`}
						>
							<div className="flex justify-between text-base pb-2 font-medium text-gray-600">
								<p>Subtotal</p>
								<p>{cart?.total}</p>
							</div>
							<div className="mt-2">
								<Link
									href="/checkout"
									title="Checkout"
									onClick={() => closeModal && closeModal()}
									className="flex w-full justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-accent hover:bg-highlight"
								>
									Checkout
								</Link>
							</div>
							<div className="mt-6 flex justify-center text-sm text-center text-gray-500">
								<button
									type="button"
									className="text-red-600 font-medium hover:text-green-main"
									onClick={handleClearCart}
								>
									Clear Cart &nbsp;
								</button>
								<p>
									or{" "}
									<button
										type="button"
										className="text-accent font-medium hover:text-green-main"
										onClick={() => closeModal && closeModal()}
									>
										Continue Shopping
										<span aria-hidden="true"> &rarr;</span>
									</button>
								</p>
							</div>
						</div>
					</div>
				</div>
			</Transition.Child>
		</Dialog.Panel>
	)
}

export default ShoppingCart
