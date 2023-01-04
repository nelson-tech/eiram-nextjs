"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js"
import { SubmitHandler, useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import schema from "./formSchema"
import LoadingSpinner from "@components/LoadingSpinner"
import FormField from "./formField"
import DocumentDuplicateIcon from "@icons/DocumentDuplicate"
import { CART_ENDPOINT } from "@lib/constants"
import useCart from "@lib/hooks/useCart"
import useAlerts from "@lib/hooks/useAlerts"
import { LockClosedIcon } from "@heroicons/react/20/solid"

// ####
// #### Types
// ####

type ContactInformationType = {
	address_1: string
	address_2: string
	city: string
	company: string
	country: string
	postcode: string
	phone: string
	email: string
	state: string
	first_name: string
	last_name: string
}

type FormDataType = {
	billing_address: ContactInformationType
	shipping_address: ContactInformationType
	shipToDifferentAddress: boolean
	customer_note: string
}

type CheckoutFormProps = {
	cart: WC_CartType
	colors: WP_MENU["acf"]["colors"]
}

// ####
// #### Component
// ####

const CheckoutForm = ({ cart, colors }: CheckoutFormProps) => {
	const router = useRouter()
	const { fetchCart } = useCart()

	const { openAlert } = useAlerts()

	const [loading, setLoading] = useState(false)

	const stripe = useStripe()
	const elements = useElements()
	const CARD_ELEMENT_OPTIONS = {
		style: {
			base: {
				iconColor: "black",
				color: "black",
				fontSize: "18px",
				fontFamily: "Raleway, sans-serif",
				fontSmoothing: "antialiased",
				"::placeholder": {
					color: "black",
				},
			},
			invalid: {
				iconColor: "#fa004f",
				color: "#fa004f",
			},
		},
	}

	const {
		formState: { errors },
		register,
		handleSubmit,
		setValue,
		control,
	} = useForm<FormDataType>({
		resolver: zodResolver(schema),
		defaultValues: {
			billing_address: {
				address_1: cart?.billing_address?.address_1,
				address_2: cart?.billing_address?.address_2,
				city: cart?.billing_address?.city,
				company: cart?.billing_address?.company,
				country: cart?.billing_address?.country,
				postcode: cart?.billing_address?.postcode,
				phone: cart?.billing_address?.phone,
				email: cart?.billing_address?.email,
				state: cart?.billing_address?.state,
				first_name: cart?.billing_address?.first_name,
				last_name: cart?.billing_address?.last_name,
			},
			shipToDifferentAddress: false,
			shipping_address: {
				address_1: cart?.shipping_address?.address_1,
				address_2: cart?.shipping_address?.address_2,
				city: cart?.shipping_address?.city,
				company: cart?.shipping_address?.company,
				country: cart?.shipping_address?.country,
				postcode: cart?.shipping_address?.postcode,
				email: cart?.billing_address?.email,
				state: cart?.shipping_address?.state,
				first_name: cart?.shipping_address?.first_name,
				last_name: cart?.shipping_address?.last_name,
			},
		},
	})

	const shippingDifferent = useWatch({
		control,
		name: "shipToDifferentAddress",
	})
	const onSubmit: SubmitHandler<FormDataType> = async (formData) => {
		setLoading(true)

		// Exclude shipping unless billing and shipping should be different
		const { shipping_address, shipToDifferentAddress, billing_address, customer_note } = formData

		const input: WC_CheckoutInputType = {
			billing_address,
			customer_note,
			payment_method: "stripe",
			shipping_address: shipToDifferentAddress ? shipping_address : billing_address,
		}

		openAlert({
			kind: "info",
			primary: "Processing Order",
			secondary: "Sending payment request to Stripe...",
			timeout: 40000,
		})

		const stripeResult = await stripe.createSource(
			// @ts-ignore
			elements.getElement(CardElement),
			{ type: "card", owner: { email: billing_address.email } },
		)

		if (stripeResult.error?.message) {
			// TODO - Handle error
			console.warn(stripeResult.error.message)
			openAlert({
				kind: "error",
				primary: "Payment Error",
				secondary: stripeResult.error.message,
			})
		} else {
			input["payment_data"] = [
				{
					key: "stripe_source",
					value: stripeResult.source.id,
				},
				{
					key: "billing_email",
					value: billing_address.email,
				},
				{
					key: "paymentMethod",
					value: "stripe",
				},
				{
					key: "paymentRequestType",
					value: "cc",
				},
				{
					key: "wc-stripe-new-payment-method",
					value: "true",
				},
			]

			const checkoutInput: WC_API_Cart_CheckoutInputType = { action: "CHECKOUT", input }

			openAlert({
				kind: "info",
				primary: "Processing Order",
				secondary: "Processing payment and creating order...",
				timeout: 40000,
			})

			const checkoutResponse = await fetch(CART_ENDPOINT, {
				method: "POST",
				body: JSON.stringify(checkoutInput),
			})

			const checkoutData: API_CartResponseType = await checkoutResponse?.json()

			console.log("Checkout Data", checkoutData.checkout.status)

			switch (checkoutData.checkout.status) {
				case "processing":
					// Payment was successful

					openAlert({
						kind: "success",
						primary: "Order Placed Successfully!",
					})

					break
				case "pending":
					// Payment requires authorization

					openAlert({
						kind: "warning",
						primary: "Payment Incomplete.",
						timeout: 3000,
					})

					break
				case "failed":
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

			await fetchCart()

			checkoutData.checkout.order_id &&
				router.push(
					`/thanks${checkoutData.checkout.order_id ? `?id=${checkoutData.checkout.order_id}` : ""}`,
				)
		}

		// error &&
		//   setAlert({
		//     open: true,
		//     type: "error",
		//     primary: "Error Checking Out",
		//     secondary: error.message.split("] ")[1],
		//   })

		// error && console.warn(error)

		setLoading(false)
	}

	const billingValues = useWatch({ control, name: "billing_address" })

	const handleCopyBilling = () => {
		setValue("shipping_address", billingValues)
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
								name="billing_address.email"
								label="Email Address"
								type="email"
								autoComplete="email"
								containerStyle="w-auto"
							/>
							<FormField
								register={register}
								errors={errors}
								name="billing_address.phone"
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
								name="billing_address.first_name"
								label="First Name"
								type="text"
								autoComplete="cc-given-name"
								containerStyle="w-auto"
							/>
							<FormField
								register={register}
								errors={errors}
								name="billing_address.last_name"
								label="Last Name"
								type="text"
								autoComplete="cc-family-name"
								containerStyle="w-auto"
							/>
						</div>

						<FormField
							register={register}
							errors={errors}
							name="billing_address.company"
							label="Company"
							type="text"
							autoComplete="organization"
						/>

						<FormField
							register={register}
							errors={errors}
							name="billing_address.address_1"
							label="Address"
							type="text"
							autoComplete="address-line1"
						/>

						<FormField
							register={register}
							errors={errors}
							name="billing_address.address_2"
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
							name="billing_address.city"
							label="City"
							type="text"
							autoComplete="address-level2"
							containerStyle="col-span-7 md:col-span-5"
						/>

						<FormField
							register={register}
							errors={errors}
							name="billing_address.state"
							label="State / Province"
							type="text"
							autoComplete="address-level1"
							containerStyle="col-span-5 md:col-span-3"
						/>

						<FormField
							register={register}
							errors={errors}
							name="billing_address.postcode"
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
										name="shipping_address.email"
										label="Email Address"
										type="email"
										autoComplete="email"
										containerStyle="w-auto"
									/>
									<FormField
										register={register}
										errors={errors}
										name="shipping_address.phone"
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
										name="shipping_address.first_name"
										label="First Name"
										type="text"
										autoComplete="given-name"
										containerStyle="w-auto"
									/>
									<FormField
										register={register}
										errors={errors}
										name="shipping_address.last_name"
										label="Last Name"
										type="text"
										autoComplete="family-name"
										containerStyle="w-auto"
									/>
								</div>

								<FormField
									register={register}
									errors={errors}
									name="shipping_address.company"
									label="Company"
									type="text"
									autoComplete="organization"
								/>

								<FormField
									register={register}
									errors={errors}
									name="shipping_address.address_1"
									label="Address"
									type="text"
									autoComplete="street-address"
								/>

								<FormField
									register={register}
									errors={errors}
									name="shipping_address.address_2"
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
									name="shipping_address.city"
									label="City"
									type="text"
									autoComplete="address-level2"
									containerStyle="col-span-7 md:col-span-5"
								/>

								<FormField
									register={register}
									errors={errors}
									name="shipping_address.state"
									label="State / Province"
									type="text"
									autoComplete="address-level1"
									containerStyle="col-span-5 md:col-span-3"
								/>

								<FormField
									register={register}
									errors={errors}
									name="shipping_address.postcode"
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
										base: { iconColor: colors.accent },
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

					{/* <p className="flex justify-center text-sm font-medium text-gray-500 mt-6">
        <LockClosedIcon
          className="w-5 h-5 text-gray-400 mr-1.5"
          aria-hidden="true"
        />
        Payment details stored in plain text
      </p> */}
				</form>
			</div>
		</section>
	)
}

export default CheckoutForm
