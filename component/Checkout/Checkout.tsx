"use client"

import { useEffect, useState } from "react"
import { Elements } from "@stripe/react-stripe-js"
import type { StripeElementsOptions } from "@stripe/stripe-js/types/stripe-js/elements-group"

import { Customer } from "@api/codegen/graphql"
import useCart from "@lib/hooks/useCart"
import getStripe from "@lib/utils/getStripe"
import getTokensClient from "@lib/utils/getTokensClient"
import { STRIPE_ENDPOINT } from "@lib/constants"

import Link from "component/Link"
import LoadingSpinner from "component/LoadingSpinner"
import CartSummary from "./CartSummary"
import CheckoutForm from "./CheckoutForm"
import DiscountForm from "./DiscountForm"
import MobileSummary from "./MobileSummary"
import PricingSummary from "./PricingSummary"

type CheckoutProps = {
	hidePrices?: boolean
	discounts?: boolean
	stripeData: STRIPE_PaymentIntentType | null | undefined
	customer: Customer | null | undefined
}
const Checkout = ({
	hidePrices = false,
	discounts = false,
	stripeData: stripeServerData,
	customer,
}: CheckoutProps) => {
	const [stripeData, setStripeData] = useState<STRIPE_PaymentIntentType | null | undefined>(
		stripeServerData,
	)

	const { cart, loading: cartLoading } = useCart().state

	const stripePromise = getStripe()

	const stripeOptions: StripeElementsOptions | null = stripeData?.clientSecret
		? {
				clientSecret: stripeData.clientSecret,
				appearance: { theme: "stripe", labels: "floating" },
		  }
		: null

	useEffect(() => {
		getTokensClient().then(({ tokens }) => {
			fetch(STRIPE_ENDPOINT, {
				method: "POST",
				body: JSON.stringify({ tokens }),
			}).then((response) =>
				response.json().then((data: STRIPE_PaymentIntentType) => setStripeData(data)),
			)
		})
	}, [cart])

	return (
		<>
			{cartLoading ? (
				<div className="w-full h-screen mx-auto flex justify-center items-center">
					<LoadingSpinner size={12} />
				</div>
			) : (cart?.contents?.itemCount ?? 0) < 1 ? (
				<div className="max-w-max mx-auto min-h-full py-24">
					<div className="sm:ml-6">
						<div className="text-center">
							<h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
								Cart is empty.
							</h1>
							<p className="mt-1 text-base text-gray-500">
								Please add some items to your cart before checking out.
							</p>
						</div>
						<div className="mt-10 flex space-x-3 justify-center">
							<Link
								href="/shop"
								className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-accent hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-highlight"
							>
								Visit our shop.
							</Link>
						</div>
					</div>
				</div>
			) : (
				<div className="bg-white">
					{/* Background color split screen for large screens */}
					<div
						className="fixed top-0 left-0 hidden h-full w-1/2 bg-white lg:block"
						aria-hidden="true"
					/>
					<div
						className="fixed top-0 right-0 hidden h-full w-1/2 bg-gray-50 lg:block"
						aria-hidden="true"
					/>

					<div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
						<h1 className="sr-only">Checkout | Order information</h1>

						<section
							aria-labelledby="summary-heading"
							className="bg-gray-50 px-4 pt-16 pb-10 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16"
						>
							<div className="mx-auto max-w-lg lg:max-w-none">
								<h2 id="summary-heading" className="text-lg font-medium text-gray-900">
									Order summary
								</h2>
								{cart?.contents?.nodes && (
									<ul
										role="list"
										className="divide-y divide-gray-200 text-sm font-medium text-gray-900"
									>
										<CartSummary lineItems={cart?.contents.nodes} />
									</ul>
								)}
								{!hidePrices && (
									<div>
										{discounts && <DiscountForm />}

										<PricingSummary
											cart={cart}
											className="hidden space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900 lg:block"
										/>

										<MobileSummary hidePrices={hidePrices} cart={cart} />
									</div>
								)}
							</div>
						</section>
						{cart && stripeData?.clientSecret && customer ? (
							<Elements stripe={stripePromise} options={stripeOptions ?? undefined}>
								<CheckoutForm customer={customer} stripeData={stripeData} />
							</Elements>
						) : (
							<div className="h-screen mt-48 mx-auto">
								<LoadingSpinner size={12} opacity={50} style="mx-auto" />
							</div>
						)}
					</div>
				</div>
			)}
		</>
	)
}

export default Checkout
