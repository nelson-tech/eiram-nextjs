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
        className="group relative bg-white border border-gray-200 rounded-md w-full flex flex-col overflow-hidden"
        onMouseEnter={() => setIsShowing((isShowing) => !isShowing)}
        onMouseLeave={() => setIsShowing((isShowing) => !isShowing)}
      >
        {product?.featuredImage?.node?.sourceUrl && (
          <div className=" transition-all h-64">
            <div className="w-full h-64 relative flex justify-center items-center overflow-hidden">
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
                  className="object-cover h-full w-full"
                  priority
                />
              </Transition>
              <Transition
                show={isShowing}
                as="div"
                className="aspect-square h-64 absolute"
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

        <div className="flex-1 space-y-2 flex flex-col w-full">
          <h3 className="px-4 py-2 text-gray-900 group-hover:text-accent transition-all text-base sm:text-xl">
            <div className="flex">
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </div>
          </h3>
          {product.shortDescription && (
            <div
              className="text-sm text-gray-600 p-4"
              dangerouslySetInnerHTML={{ __html: product.shortDescription }}
            />
          )}

          <div className="px-4 pb-2 flex-1 flex flex-col justify-end">
            {product.onSale && (
              <div className="flex">
                <span className="text-center items-center sm:hidden rounded-md bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800">
                  SALE!
                </span>
              </div>
            )}
            <div className="flex">
              {product.onSale && (
                <p className="text-sm text-gray-400 mr-2 line-through">
                  {product.regularPrice}
                </p>
              )}
              <p className="text-sm font-medium text-gray-500 w-full">
                {product.price}
              </p>
              {product.onSale && (
                <span className="hidden sm:inline-flex items-center rounded-md bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800">
                  SALE!
                </span>
              )}
            </div>
          </div>
          <div className="bg-white w-full border-t text-green-main py-2 transition-all text-center group-hover:bg-green-main group-hover:text-white">
            View Product
          </div>
        </div>
      </Link>
    </>
  )
}

export default ProductCard
