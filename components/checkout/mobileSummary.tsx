import { Cart } from "@api/codegen/graphql"
import { Disclosure } from "@headlessui/react"

import formatCurrencyString from "@lib/utils/formatCurrencyString"

import CartSummary from "./cartSummary"
import DiscountForm from "./discountForm"
import PricingSummary from "./pricingSummary"

type MobileSummaryProps = {
	hidePrices?: boolean
	discounts?: boolean
	cart: Cart
}

const MobileSummary = ({ hidePrices = false, discounts = false, cart }: MobileSummaryProps) => {
	return (
		<section aria-labelledby="order-heading" className="bg-gray-50 px-4 py-6 sm:px-6 lg:hidden">
			<Disclosure as="div" defaultOpen className="max-w-lg mx-auto">
				{({ open }) => (
					<>
						<div className="flex items-center justify-between">
							<h2 id="order-heading" className="text-lg font-medium text-gray-900">
								Your Order
							</h2>
							<Disclosure.Button className="font-medium text-blue-main hover:text-green-main">
								{open ? "Hide full summary" : "Show full summary"}
								<span></span>
							</Disclosure.Button>
						</div>
						<Disclosure.Panel>
							{cart.contents.nodes && (
								<ul className="divide-y divide-gray-200">
									<CartSummary lineItems={cart.contents.nodes} />
								</ul>
							)}

							{!hidePrices && (
								<div className="border-t border-gray-200">
									{discounts && <DiscountForm styles="mt-10" />}

									<PricingSummary cart={cart} />
								</div>
							)}
						</Disclosure.Panel>
						{!hidePrices && (
							<p className="flex items-center justify-between text-sm font-medium text-gray-900 border-t border-gray-200 pt-6 mt-6">
								<span className="text-base">Total</span>
								<span className="text-base">{cart.total}</span>
							</p>
						)}{" "}
					</>
				)}
			</Disclosure>
		</section>
	)
}

export default MobileSummary
