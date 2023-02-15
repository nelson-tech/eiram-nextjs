import { CartItem as CartItemType } from "@api/codegen/graphql"
import CartItem from "component/ShoppingCart/CartItem"

type CartSummaryProps = {
	lineItems: CartItemType[]
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
