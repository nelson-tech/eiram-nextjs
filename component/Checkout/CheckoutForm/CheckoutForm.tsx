"use client"

import { CardElement } from "@stripe/react-stripe-js"
import type { StripeCardElementChangeEvent } from "@stripe/stripe-js"
import { SubmitHandler, useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LockClosedIcon, DocumentDuplicateIcon } from "@heroicons/react/20/solid"

import { Customer, CustomerAddress } from "@api/codegen/graphql"
import useCheckout from "@lib/hooks/useCheckout"
import useAuth from "@lib/hooks/useAuth"

import LoadingSpinner from "component/LoadingSpinner"
import schema from "./FormSchema"
import FormField from "./FormField"
import GuestWarning from "../GuestWarning"

// ####
// #### Types
// ####

type FormDataType = {
	billing: CustomerAddress | null | undefined
	shipping: CustomerAddress | null | undefined
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
	const { isAuth, processing } = useAuth()
	const { loading, submitCheckout } = useCheckout(stripeData)

	const {
		formState: { errors },
		register,
		handleSubmit,
		setValue,
		control,
	} = useForm<FormDataType>({
		resolver: zodResolver(schema),
		defaultValues: {
			billing: customer?.billing,
			shipToDifferentAddress: false,
			shipping: customer?.shipping,
		},
	})

	const shippingDifferent = useWatch({
		control,
		name: "shipToDifferentAddress",
	})

	const onSubmit: SubmitHandler<FormDataType> = async (formData) => {
		const { shipping, shipToDifferentAddress, billing, customerNote } = formData

		await submitCheckout({
			CardElement,
			customerEmail: billing?.email ?? customer.email,
			input: {
				billing,
				customerNote,
				paymentMethod: "stripe",
				shipping: shipToDifferentAddress ? shipping : billing,
				shipToDifferentAddress,
				isPaid: false,
			},
		})
	}

	const handleChange = async (event: StripeCardElementChangeEvent) => {
		// Listen for changes in the CardElement
		// and display any errors as the customer types their card details

		event.error && console.warn("Error in CardElement", event.error.message)
	}

	const billingValues = useWatch({ control, name: "billing" })

	const handleCopyBilling = () => {
		setValue("shipping", billingValues)
	}

	return (
		<form
			className="px-4 pt-16 pb-36 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="mx-auto max-w-lg lg:max-w-none">
				{!isAuth && !processing && <GuestWarning />}
				<section aria-labelledby="billing-heading">
					<h2 id="billing-heading" className="text-lg font-medium text-gray-900">
						Billing details
					</h2>

					<div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
						<FormField
							register={register}
							errors={errors}
							name="billing.email"
							label="Email Address"
							type="email"
							autoComplete="email"
							containerStyle="col-span-1 sm:col-span-3"
						/>

						<FormField
							register={register}
							errors={errors}
							name="billing.phone"
							label="Phone Number"
							type="text"
							autoComplete="tel"
							containerStyle="col-span-1 sm:col-span-3"
						/>

						<FormField
							register={register}
							errors={errors}
							name="billing.firstName"
							label="First Name"
							type="text"
							autoComplete="cc-given-name"
							containerStyle="col-span-1 sm:col-span-3"
						/>

						<FormField
							register={register}
							errors={errors}
							name="billing.lastName"
							label="Last Name"
							type="text"
							autoComplete="cc-family-name"
							containerStyle="col-span-1 sm:col-span-3"
						/>

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
							containerStyle="col-span-1 md:col-span-2"
						/>

						<FormField
							register={register}
							errors={errors}
							name="billing.state"
							label="State / Province"
							type="text"
							autoComplete="address-level1"
							containerStyle="col-span-1 md:col-span-2"
						/>

						<FormField
							register={register}
							errors={errors}
							name="billing.postcode"
							label="Postal Code"
							type="text"
							autoComplete="postal-code"
							containerStyle="col-span-1 md:col-span-2"
						/>
					</div>
				</section>

				<div className="mt-8 ">
					<FormField
						register={register}
						errors={errors}
						name="shipToDifferentAddress"
						label="Ship to a different address than billing address"
						labelAfter
						type="checkbox"
						containerStyle="flex items-center h-5"
						labelStyle="mt-1 pt-0.5 text-sm font-medium text-gray-900"
						inputStyle="mr-2 h-4 w-4 border-gray-300 border-b p-2 rounded outline-none focus:ring-accent"
					/>
				</div>

				{shippingDifferent && (
					<section aria-labelledby="shipping-heading" className="mt-10">
						<div className="col-span-full flex items-center">
							<h2 id="shipping-heading" className="text-lg font-medium text-gray-900">
								Shipping information
							</h2>
							<div
								className="ml-4 flex text-gray-400 cursor-pointer text-sm items-center"
								onClick={handleCopyBilling}
							>
								<DocumentDuplicateIcon className="h-5 w-5 mr-1 text-accent" />
								Copy from billing
							</div>
						</div>

						<div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
							<FormField
								register={register}
								errors={errors}
								name="shipping.email"
								label="Email Address"
								type="email"
								autoComplete="email"
								containerStyle="col-span-1 sm:col-span-3"
							/>

							<FormField
								register={register}
								errors={errors}
								name="shipping.phone"
								label="Phone Number"
								type="text"
								autoComplete="tel"
								containerStyle="col-span-1 sm:col-span-3"
							/>

							<FormField
								register={register}
								registerOptions={{ required: "First name is required." }}
								errors={errors}
								name="shipping.firstName"
								label="First Name"
								type="text"
								autoComplete="given-name"
								containerStyle="col-span-1 sm:col-span-3"
							/>

							<FormField
								register={register}
								errors={errors}
								name="shipping.lastName"
								label="Last Name"
								type="text"
								autoComplete="family-name"
								containerStyle="col-span-1 sm:col-span-3"
							/>

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
								containerStyle="col-span-1 md:col-span-2"
							/>

							<FormField
								register={register}
								errors={errors}
								name="shipping.state"
								label="State / Province"
								type="text"
								autoComplete="address-level1"
								containerStyle="col-span-1 md:col-span-2"
							/>

							<FormField
								register={register}
								errors={errors}
								name="shipping.postcode"
								label="Postal Code"
								type="text"
								autoComplete="postal-code"
								containerStyle="col-span-1 md:col-span-2"
							/>
						</div>
					</section>
				)}
				<section className="mt-10 border-t">
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
				</section>

				<section aria-labelledby="payment-heading" className="mt-10">
					<h2 id="payment-heading" className="text-lg font-medium text-gray-900">
						Payment details
					</h2>

					<div className="pb-8 text-sm text-gray-300 flex items-center">
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
					</div>
					<div className="col-span-full grid gap-y-6 gap-6 pb-8">
						<CardElement
							options={{
								style: {
									base: { iconColor: "#8aa29e" },
								},
							}}
							onChange={handleChange}
							className=" border border-gray-300 focus:ring-accent focus:border-accent p-2 rounded-md"
						/>
					</div>

					<button
						type="submit"
						className="w-full mt-6 bg-accent border border-transparent rounded-md shadow-sm py-2 px-4 text-lg font-medium text-white hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-offset-2 outline-none focus:ring-accent"
					>
						{loading ? <LoadingSpinner size={7} color="white" style="mx-auto" /> : "Place Order"}
					</button>
				</section>
			</div>
		</form>
	)
}

export default CheckoutForm
