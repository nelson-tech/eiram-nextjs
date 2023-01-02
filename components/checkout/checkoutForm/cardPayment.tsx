"use client"

import {
	CardNumberElement,
	CardExpiryElement,
	CardCvcElement,
	useElements,
} from "@stripe/react-stripe-js"

const CardPayment = () => {
	const elements = useElements()

	const cardElement = elements.getElement(CardNumberElement)
	return (
		<form>
			<CardNumberElement options={CARD_ELEMENT_OPTIONS} />
			<CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
			<CardCvcElement options={CARD_ELEMENT_OPTIONS} />
		</form>
	)
}

// Stripe has a defined style object that you can use to style Elements
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

export default CardPayment
