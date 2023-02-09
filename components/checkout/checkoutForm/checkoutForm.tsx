"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js"
import { CreatePaymentMethodCardData } from "@stripe/stripe-js"
import { SubmitHandler, useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LockClosedIcon } from "@heroicons/react/20/solid"

import getClient from "@api/client"
import { CheckoutDocument, CheckoutInput, Customer, CustomerAddress } from "@api/codegen/graphql"
import useCart from "@lib/hooks/useCart"
import useAlerts from "@lib/hooks/useAlerts"

import LoadingSpinner from "@components/LoadingSpinner"
import DocumentDuplicateIcon from "@icons/DocumentDuplicate"
import schema from "./formSchema"
import FormField from "./formField"

// ####
// #### Types
// ####

type FormDataType = {
	billing: CustomerAddress
	shipping: CustomerAddress
	shipToDifferentAddress: boolean
	customerNote: string
}

type CheckoutFormPropsType = {
	customer: Customer
	stripeData: STRIPE_PaymentIntentType
}

// ####
// #### Component
// ####

const CheckoutForm = ({ stripeData, customer }: CheckoutFormPropsType) => {
	const router = useRouter()
	const client = getClient()

	console.log("Checkout data", stripeData, customer)

	const { clearCart } = useCart()

	const { openAlert } = useAlerts()

	const [loading, setLoading] = useState(false)

	const stripe = useStripe()
	const elements = useElements()

	const {
		formState: { errors },
		register,
		handleSubmit,
		setValue,
		control,
	} = useForm<FormDataType>({
		resolver: zodResolver(schema),
		defaultValues: {
			billing: {
				address1: customer?.billing?.address1,
				address2: customer?.billing?.address2,
				city: customer?.billing?.city,
				company: customer?.billing?.company,
				country: customer?.billing?.country,
				postcode: customer?.billing?.postcode,
				phone: customer?.billing?.phone,
				email: customer?.billing?.email,
				state: customer?.billing?.state,
				firstName: customer?.billing?.firstName,
				lastName: customer?.billing?.lastName,
			},
			shipToDifferentAddress: false,
			shipping: {
				address1: customer?.shipping?.address1,
				address2: customer?.shipping?.address2,
				city: customer?.shipping?.city,
				company: customer?.shipping?.company,
				country: customer?.shipping?.country,
				postcode: customer?.shipping?.postcode,
				email: customer?.shipping?.email,
				state: customer?.shipping?.state,
				firstName: customer?.shipping?.firstName,
				lastName: customer?.shipping?.lastName,
			},
		},
	})

	const shippingDifferent = useWatch({
		control,
		name: "shipToDifferentAddress",
	})

	const onSubmit: SubmitHandler<FormDataType> = async (formData) => {
		console.log("Attempting to submit.")

		setLoading(true)

		// Exclude shipping unless billing and shipping should be different
		const { shipping, shipToDifferentAddress, billing, customerNote } = formData

		const input: CheckoutInput = {
			billing,
			customerNote,
			paymentMethod: "stripe",
			shipping: shipToDifferentAddress ? shipping : billing,
			shipToDifferentAddress,
			isPaid: false,
		}

		openAlert({
			kind: "info",
			primary: "Processing payment.",
			secondary: "Sending payment request to Stripe...",
			timeout: 40000,
		})

		const paymentMethod: Omit<CreatePaymentMethodCardData, "type"> = {
			card: elements.getElement(CardElement),
			billing_details: { email: customer.email },
		}

		if (!paymentMethod.card) {
			setLoading(false)
			return null
		}

		// use Stripe client secret to process card payment method
		const stripeResult = await stripe.confirmCardPayment(stripeData.clientSecret, {
			payment_method: paymentMethod,
		})
		console.log("Stripe Result", stripeResult)

		if (stripeResult.error) {
			console.warn(stripeResult.error.message)
			openAlert({
				kind: "error",
				primary: "Payment Error",
				secondary: stripeResult.error.message,
			})
		} else {
			input["metaData"] = [
				{
					key: "_stripe_intent_id",
					value: stripeData.paymentIntentId,
				},
			]
			input["isPaid"] = true

			openAlert({
				kind: "info",
				primary: "Processing Order",
				secondary: "Payment processed. Finalizing order...",
				timeout: 40000,
			})

			try {
				const checkoutData = await client.request(CheckoutDocument, { input })

				console.log("Checkout Data", checkoutData.checkout)

				switch (checkoutData.checkout.result) {
					case "success":
						// Payment was successful

						openAlert({
							kind: "success",
							primary: "Order Placed Successfully!",
						})

						break
					case "PENDING":
						// Payment requires authorization

						openAlert({
							kind: "warning",
							primary: "Payment Incomplete.",
							timeout: 3000,
						})

						break
					case "FAILED":
						// Payment failed

						openAlert({
							kind: "error",
							primary: "Payment Failed.",
							timeout: 3000,
						})

						break

					default:
						break
				}

				checkoutData.checkout.order.orderNumber &&
					router.push(
						`/thanks${
							checkoutData.checkout.order.orderNumber
								? `?id=${checkoutData.checkout.order.orderNumber}`
								: ""
						}`,
					)

				await clearCart()
			} catch (error) {
				console.warn("Error checking out", error)
			}
		}

		setLoading(false)
	}

	const billingValues = useWatch({ control, name: "billing" })

	const handleCopyBilling = () => {
		setValue("shipping", billingValues)
	}

	return (
		<section
			aria-labelledby="payment-heading"
			className="flex-auto overflow-y-auto px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8 lg:pt-0 lg:pb-16"
		>
			<h2 id="payment-heading" className="sr-only">
				Payment and shipping details
			</h2>

			<form></form>

			<div className="max-w-2xl mx-auto lg:pt-16">
				<form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
					<div className="grid grid-cols-12 gap-y-6 gap-x-4">
						<h2 className="col-span-full text-xl font-semibold">Billing Details</h2>
						<div className="col-span-full grid gap-y-6 md:grid-cols-2 gap-6">
							<FormField
								register={register}
								errors={errors}
								name="billing.email"
								label="Email Address"
								type="email"
								autoComplete="email"
								containerStyle="w-auto"
							/>
							<FormField
								register={register}
								errors={errors}
								name="billing.phone"
								label="Phone Number"
								type="text"
								autoComplete="tel"
								containerStyle="w-auto"
							/>
						</div>

						<div className="col-span-full grid gap-y-6 md:grid-cols-2 gap-6">
							<FormField
								register={register}
								errors={errors}
								name="billing.firstName"
								label="First Name"
								type="text"
								autoComplete="cc-given-name"
								containerStyle="w-auto"
							/>
							<FormField
								register={register}
								errors={errors}
								name="billing.lastName"
								label="Last Name"
								type="text"
								autoComplete="cc-family-name"
								containerStyle="w-auto"
							/>
						</div>

						<FormField
							register={register}
							errors={errors}
							name="billing.company"
							label="Company"
							type="text"
							autoComplete="organization"
						/>

						<FormField
							register={register}
							errors={errors}
							name="billing.address1"
							label="Address"
							type="text"
							autoComplete="address-line1"
						/>

						<FormField
							register={register}
							errors={errors}
							name="billing.address2"
							label={
								<>
									Address <span className="text-gray-400">(Continued)</span>
								</>
							}
							type="text"
							autoComplete="address-line2"
						/>

						<FormField
							register={register}
							errors={errors}
							name="billing.city"
							label="City"
							type="text"
							autoComplete="address-level2"
							containerStyle="col-span-7 md:col-span-5"
						/>

						<FormField
							register={register}
							errors={errors}
							name="billing.state"
							label="State / Province"
							type="text"
							autoComplete="address-level1"
							containerStyle="col-span-5 md:col-span-3"
						/>

						<FormField
							register={register}
							errors={errors}
							name="billing.postcode"
							label="Postal Code"
							type="text"
							autoComplete="postal-code"
							containerStyle="col-span-full md:col-span-4"
						/>
					</div>

					<div className="mt-6 flex space-x-2">
						<FormField
							register={register}
							errors={errors}
							name="shipToDifferentAddress"
							label="Ship to a different address than billing address"
							labelAfter
							type="checkbox"
							containerStyle="flex items-center h-5"
							labelStyle="text-sm font-medium text-gray-900"
							inputStyle="mr-2 h-4 w-4 border-gray-300 border-b p-2 rounded text-blue-main outline-none focus:ring-blue-main"
						/>
					</div>
					<FormField
						register={register}
						errors={errors}
						name="checkoutData?Note"
						label="Note"
						type="text-area"
						autoComplete="postal-code"
						containerStyle="col-span-full md:col-span-4 mt-4"
						textArea
					/>

					{shippingDifferent && (
						<>
							<div className="grid grid-cols-12 mt-6 mb-4 border-t border-gray-300 pt-4 gap-y-6 gap-x-4">
								<div className="col-span-full flex items-center">
									<h2 className="text-xl font-semibold">Shipping Details</h2>
									<div
										className="ml-4 flex text-gray-400 cursor-pointer text-sm items-center"
										onClick={handleCopyBilling}
									>
										<DocumentDuplicateIcon styling="h-4 w-4 text-green-main" />
										Copy from billing
									</div>
								</div>
								<div className="col-span-full grid gap-y-6 md:grid-cols-2 gap-6">
									<FormField
										register={register}
										errors={errors}
										name="shipping.email"
										label="Email Address"
										type="email"
										autoComplete="email"
										containerStyle="w-auto"
									/>
									<FormField
										register={register}
										errors={errors}
										name="shipping.phone"
										label="Phone Number"
										type="text"
										autoComplete="tel"
										containerStyle="w-auto"
									/>
								</div>

								<div className="col-span-full grid gap-y-6 md:grid-cols-2 gap-6">
									<FormField
										register={register}
										registerOptions={{ required: "First name is required." }}
										errors={errors}
										name="shipping.firstName"
										label="First Name"
										type="text"
										autoComplete="given-name"
										containerStyle="w-auto"
									/>
									<FormField
										register={register}
										errors={errors}
										name="shipping.lastName"
										label="Last Name"
										type="text"
										autoComplete="family-name"
										containerStyle="w-auto"
									/>
								</div>

								<FormField
									register={register}
									errors={errors}
									name="shipping.company"
									label="Company"
									type="text"
									autoComplete="organization"
								/>

								<FormField
									register={register}
									errors={errors}
									name="shipping.address1"
									label="Address"
									type="text"
									autoComplete="street-address"
								/>

								<FormField
									register={register}
									errors={errors}
									name="shipping.address2"
									label={
										<>
											Address <span className="text-gray-400">(Continued)</span>
										</>
									}
									type="text"
									autoComplete="street-address"
								/>

								<FormField
									register={register}
									errors={errors}
									name="shipping.city"
									label="City"
									type="text"
									autoComplete="address-level2"
									containerStyle="col-span-7 md:col-span-5"
								/>

								<FormField
									register={register}
									errors={errors}
									name="shipping.state"
									label="State / Province"
									type="text"
									autoComplete="address-level1"
									containerStyle="col-span-5 md:col-span-3"
								/>

								<FormField
									register={register}
									errors={errors}
									name="shipping.postcode"
									label="Postal Code"
									type="text"
									autoComplete="postal-code"
									containerStyle="col-span-full md:col-span-4"
								/>
							</div>
						</>
					)}

					<div className="my-8 py-6 border-gray-300 border-t border-b">
						<h2 className="col-span-full text-xl font-semibold pb-2">Payment Details</h2>
						<p className="pb-8 text-sm text-gray-300 flex items-center">
							<LockClosedIcon className="h-4 w-4 mr-1" />
							Payments are securely processed by&nbsp;
							<a
								href="https://stripe.com"
								target="_blank"
								rel="noreferrer"
								title="Visit Stripe to learn more."
								style={{ color: "rgba(85, 108, 214,0.6)" }}
								className="hover:underline transition-all"
							>
								stripe
							</a>
							.
						</p>
						<div className="col-span-full grid gap-y-6 gap-6 pb-8">
							<CardElement
								options={{
									style: {
										base: { iconColor: "#8aa29e" },
									},
								}}
								className=" border border-gray-300 focus:ring-accent focus:border-accent p-2 rounded-md font-sans"
							/>
						</div>
					</div>

					<button
						type="submit"
						className="w-full mt-6 bg-accent border border-transparent rounded-md shadow-sm py-2 px-4 text-lg font-medium text-white hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-offset-2 outline-none focus:ring-blue-main"
					>
						{loading ? <LoadingSpinner size={7} color="white" style="mx-auto" /> : "Place Order"}
					</button>
				</form>
			</div>
		</section>
	)
}

export default CheckoutForm
