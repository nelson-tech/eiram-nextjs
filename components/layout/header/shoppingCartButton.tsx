"use client"

import LoadingSpinner from "@components/LoadingSpinner"
import ShoppingCartIcon from "@icons/ShoppingCart"
import useCart from "@lib/hooks/useCart"
import useModals from "@lib/hooks/useModals"

const ShoppingCartButton = () => {
	const modalsSend = useModals().send

	const { cart, loading } = useCart().state

	return (
		<button
			className="group -m-2 p-2 flex items-center"
			onClick={() => modalsSend && modalsSend("openShoppingCart")}
		>
			<ShoppingCartIcon
				size={6}
				type={(cart?.items_count || 0) > 0 ? "solid" : "outline"}
				styling="flex-shrink-0 text-gray-400 group-hover:text-gray-500 transition-all"
			/>
			<span className="ml-2 text-sm font-medium text-gray-400 group-hover:text-gray-800 transition-all">
				{loading ? <LoadingSpinner size={2} /> : cart?.items_count ?? 0}
			</span>
			<span className="sr-only">items in cart, view bag</span>
		</button>
	)
}

export default ShoppingCartButton
