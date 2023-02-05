import { Product } from "@api/codegen/graphql"

import ProductCard from "@components/productCard"

type ProductGridProps = {
	products: Product[]
}

const ProductGrid = ({ products }: ProductGridProps) => {
	return (
		<div className="py-6 px-8 mx-auto lg:max-w-7xl">
			<div className="">
				<h2 id="product-heading" className="sr-only">
					Products
				</h2>

				<div className="grid grid-cols-2 gap-y-4 gap-x-2 md:gap-x-4 md:gap-y-10 md:grid-cols-3 lg:gap-x-4 lg:grid-cols-4">
					{products &&
						products.map(
							(product, i) => product && <ProductCard product={product} key={product.id} />,
						)}
				</div>
			</div>
		</div>
	)
}

export default ProductGrid
