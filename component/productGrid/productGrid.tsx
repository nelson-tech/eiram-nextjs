import { Product } from "@api/codegen/graphql"

import ProductCard from "component/productCard"

type ProductGridProps = {
	products: Product[]
}

const ProductGrid = ({ products }: ProductGridProps) => {
	return (
		<div className="grid grid-cols-2 gap-y-4 gap-x-2 md:gap-x-4 md:gap-y-10 md:grid-cols-3 lg:gap-x-4 lg:grid-cols-4">
			{products &&
				products.map((product, i) => product && <ProductCard product={product} key={product.id} />)}
		</div>
	)
}

export default ProductGrid
