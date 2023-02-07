"use client"

import { Elements } from "@stripe/react-stripe-js"
import { StripeElementsOptions } from "@stripe/stripe-js"

import { Customer, Menu_Sitesettings_Colors } from "@api/codegen/graphql"
import useAuth from "@lib/hooks/useAuth"
import useCart from "@lib/hooks/useCart"
import getStripe from "@lib/utils/getStripe"

import Link from "@components/Link"
import LoadingSpinner from "@components/LoadingSpinner"
import CartSummary from "./cartSummary"
import CheckoutForm from "./checkoutForm"
import DiscountForm from "./discountForm"
import GuestWarning from "./guestWarning"
import MobileSummary from "./mobileSummary"
import PricingSummary from "./pricingSummary"

type CheckoutProps = {
	hidePrices?: boolean
	discounts?: boolean
	stripeData: STRIPE_PaymentIntentType
	colors: Menu_Sitesettings_Colors
	customer: Customer
}
const Checkout = ({
	hidePrices = false,
	discounts = false,
	stripeData,
	colors,
	customer,
}: CheckoutProps) => {
	const { isAuth, processing } = useAuth()

	const { cart, loading: cartLoading } = useCart().state

	const stripePromise = getStripe()

	const stripeOptions: StripeElementsOptions = {
		clientSecret: stripeData.clientSecret,
		appearance: { theme: "stripe", labels: "floating" },
	}

	return (
		<>
			{cartLoading ? (
				<div className="w-full h-screen mx-auto flex justify-center items-center">
					<LoadingSpinner size={12} />
				</div>
			) : cart?.contents?.itemCount < 1 ? (
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
							{/*  <a
                    href="#"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Contact support
                  </a> --> */}
						</div>
					</div>
				</div>
			) : (
				<div>
					{!isAuth && !processing && <GuestWarning />}
					{cart && (
						<main className="lg:min-h-screen lg:overflow-hidden lg:flex lg:flex-row-reverse max-w-7xl mx-auto">
							<h1 className="sr-only">Checkout</h1>

							<MobileSummary hidePrices={hidePrices} cart={cart} />
							<section
								aria-labelledby="summary-heading"
								className="hidden bg-gray-50 w-full max-w-md flex-col lg:flex"
							>
								<h2 id="summary-heading" className="sr-only">
									Order summary
								</h2>
								{cart?.contents.nodes && (
									<ul className="flex-auto overflow-y-auto divide-y divide-gray-200 px-6">
										<CartSummary lineItems={cart?.contents.nodes} />
									</ul>
								)}
								{!hidePrices && (
									<div className="sticky bottom-0 flex-none bg-gray-50 border-t border-gray-200 p-6">
										{discounts && <DiscountForm />}

										<PricingSummary cart={cart} />
									</div>
								)}
							</section>
							{cart && stripeData ? (
								<Elements stripe={stripePromise} options={stripeOptions}>
									<CheckoutForm
										cart={cart}
										colors={colors}
										customer={customer}
										stripeData={stripeData}
									/>
								</Elements>
							) : (
								<div className="h-screen mt-48 mx-auto">
									<LoadingSpinner size={12} opacity={50} style="mx-auto" />
								</div>
							)}
						</main>
					)}
				</div>
			)}
		</>
	)
}

export default Checkout
