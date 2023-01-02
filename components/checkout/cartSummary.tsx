import CartItem from "@components/shoppingCart/cartItem"

type CartSummaryProps = {
	lineItems: WC_CartType["items"]
}
const CartSummary = ({ lineItems }: CartSummaryProps) => {
	return (
		<>
			{lineItems &&
				lineItems.map((lineItem) => (
					<CartItem lineItem={lineItem} key={lineItem.id + lineItems.length} />
				))}
		</>
	)
}

export default CartSummary
