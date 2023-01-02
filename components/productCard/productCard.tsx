import Link from "@components/Link"
import formatCurrencyString from "@lib/utils/formatCurrencyString"
import Image from "next/image"

type ProductCardProps = {
	product: WC_ProductType
}

const ProductCard = ({ product }: ProductCardProps) => {
	const categorySlug = product.categories[0]?.slug ? product.categories[0].slug : ""

	return (
		<>
			<div className="group relative bg-white border border-gray-200 rounded-md w-full flex flex-col overflow-hidden">
				{product.images[0]?.src && (
					<div className="bg-gray-200 group-hover:opacity-75 transition-all">
						<div className="w-full h-full object-center object-contain sm:w-full sm:h-full relative">
							<div className="unset-img aspect-square">
								<Image
									src={product.images[0]?.src}
									alt={product.images[0]?.alt || ""}
									fill
									sizes="(max-width: 400px) 100vw,(max-width: 768px) 50vw,33vw"
									className="custom-img"
								/>
							</div>
						</div>
					</div>
				)}

				<div className="flex-1 space-y-2 flex flex-col w-full">
					<h3 className="font-bold px-4 py-2 text-gray-900 group-hover:text-accent transition-all text-base sm:text-xl">
						<Link
							href={`/shop/${product.sku}`}
							title={product.name || ""}
							className="flex flex-col font-sans"
						>
							<span aria-hidden="true" className="absolute inset-0" />
							{product.name}
						</Link>
					</h3>
					{product.short_description && (
						<div
							className="text-sm text-gray-600 p-4"
							dangerouslySetInnerHTML={{ __html: product.short_description }}
						/>
					)}

					<div className="px-4 pb-2 flex-1 flex flex-col justify-end">
						{/*  <p className="text-sm italic text-gray-500">{product.options}</p> */}
						<p className="text-sm font-medium text-gray-400">
							{formatCurrencyString(product.prices.price)}
						</p>
					</div>
					<div className="bg-white w-full border-t text-green-main py-2 transition-all text-center group-hover:bg-green-main group-hover:text-white">
						View Product
					</div>
				</div>
			</div>
		</>
	)
}

export default ProductCard
