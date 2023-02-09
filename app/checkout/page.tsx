import Checkout from "@components/checkout"
import getCheckoutData from "@lib/server/getCheckoutData"

const CheckoutPage = async () => {
	const { stripeData, customer } = await getCheckoutData()

	return (
		<>
			<Checkout stripeData={stripeData} customer={customer} />
		</>
	)
}

export const revalidate = 0 // dynamically serve this page

export default CheckoutPage
