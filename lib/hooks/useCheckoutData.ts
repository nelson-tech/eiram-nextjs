import { useEffect, useState } from "react"

import getClient from "@api/client"
import { Customer, GetCustomerDataWithAddressesDocument } from "@api/codegen/graphql"
import { STRIPE_ENDPOINT } from "@lib/constants"
import useAuth from "./useAuth"
import useCart from "./useCart"

const useCheckoutData = () => {
	const [stripeData, setStripeData] = useState<STRIPE_PaymentIntentType>()
	const [customer, setCustomer] = useState<Customer>()

	const { context, processing } = useAuth()
	const { state } = useCart()

	const client = getClient(context.tokens)

	useEffect(() => {
		console.log("Getting stripe data")

		!processing &&
			fetch(STRIPE_ENDPOINT, {
				method: "POST",
				body: JSON.stringify({ tokens: context.tokens }),
			}).then((response) => {
				response.json().then((data: STRIPE_PaymentIntentType) => {
					console.log("Stripe data", data)

					setStripeData(data)
				})
			})
	}, [setStripeData, context, state.cart, processing])

	useEffect(() => {
		console.log("Getting customer")

		client.request(GetCustomerDataWithAddressesDocument).then((customerData) => {
			console.log("Customer data", customerData.customer)

			setCustomer(customerData.customer as Customer)
		})
	}, [setCustomer, client])

	return { stripeData, customer }
}

export default useCheckoutData
