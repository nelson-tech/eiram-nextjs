import Checkout from "@components/Checkout"
import getCheckoutData from "@lib/server/getCheckoutData"

const CheckoutPage = async () => {
	const { stripeData, customer } = await getCheckoutData()

	return (
		<>
			<Checkout stripeData={stripeData} customer={customer} />
		</>
	)
}

export default CheckoutPage

export const revalidate = 0 // dynamically serve this page

export const metadata = {
	title: "Checkout",
	description:
		"Checkout form to complete your purchase and finalize your payment to get wearing your new knitwear as soon as possible.",
	keywords: ["Checkout", "Purchase", "Eiram", "Knitwear", "Fashion", "Shopping"],
}
