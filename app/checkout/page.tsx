import Checkout from "@components/checkout"

const CheckoutPage = async () => {
	return (
		<>
			<Checkout />
		</>
	)
}

export const revalidate = 0 // dynamically serve this page

export default CheckoutPage
