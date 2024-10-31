"use client"

import { useState } from "react"
import { Transition } from "@headlessui/react"

import type { MediaItem } from "@api/codegen/graphql"
import type { FullProduct } from "@lib/types/products"

import Link from "components/Link"
import Image from "components/Image"

type ProductCardProps = {
  product: FullProduct
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isShowing, setIsShowing] = useState(false)

  const featuredImage: MediaItem | null | undefined =
    product?.featuredImage?.node

  const altImage: MediaItem | null | undefined = product.galleryImages?.nodes[0]

  return (
    <>
      <Link
        href={`/shop/${product.slug}`}
        title={product.name || ""}
        className="relative flex flex-col w-full overflow-hidden bg-white border border-gray-200 rounded-md group"
        onMouseEnter={() => setIsShowing((isShowing) => !isShowing)}
        onMouseLeave={() => setIsShowing((isShowing) => !isShowing)}
      >
        {product?.featuredImage?.node?.sourceUrl && (
          <div className="h-64 transition-all ">
            <div className="relative flex items-center justify-center w-full h-64 overflow-hidden">
              <Transition
                show={!isShowing}
                as="div"
                className="aspect-square max-h-64"
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Image
                  src={featuredImage?.sourceUrl ?? ""}
                  alt={featuredImage?.altText || ""}
                  width={featuredImage?.mediaDetails?.width ?? 0}
                  height={featuredImage?.mediaDetails?.height ?? 0}
                  className="object-cover w-full h-full"
                  priority
                />
              </Transition>
              <Transition
                show={isShowing}
                as="div"
                className="absolute h-64 aspect-square"
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Image
                  src={altImage?.sourceUrl ?? ""}
                  alt={altImage?.altText ?? ""}
                  width={altImage?.mediaDetails?.width ?? 0}
                  height={altImage?.mediaDetails?.height ?? 0}
                  className="object-cover w-full aspect-square"
                  priority
                />
              </Transition>
            </div>
          </div>
        )}

        <div className="flex flex-col flex-1 w-full space-y-2">
          <h3 className="px-4 py-2 text-base text-gray-900 transition-all group-hover:text-accent sm:text-xl">
            <div className="flex">
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </div>
          </h3>
          {product.shortDescription && (
            <div
              className="p-4 text-sm text-gray-600"
              dangerouslySetInnerHTML={{ __html: product.shortDescription }}
            />
          )}

          <div className="flex flex-col justify-end flex-1 px-4 pb-2">
            {product.onSale && (
              <div className="flex">
                <span className="text-center items-center sm:hidden rounded-md bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800">
                  SALE!
                </span>
              </div>
            )}
            <div className="flex">
              {product.onSale && (
                <p className="mr-2 text-sm text-gray-400 line-through">
                  {product.regularPrice}
                </p>
              )}
              <p className="w-full text-sm font-medium text-gray-500">
                {product.price}
              </p>
              {product.onSale && (
                <span className="hidden sm:inline-flex items-center rounded-md bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800">
                  SALE!
                </span>
              )}
            </div>
          </div>
          <div className="w-full py-2 text-center transition-all bg-white border-t text-green-main group-hover:bg-green-main group-hover:text-white">
            View Product
          </div>
        </div>
      </Link>
    </>
  )
}

export default ProductCard
