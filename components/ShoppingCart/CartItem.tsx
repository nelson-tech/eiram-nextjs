"use client"

import { Fragment } from "react"
import { Listbox, Transition } from "@headlessui/react"
import ChevronUpDownIcon from "@heroicons/react/20/solid/ChevronUpDownIcon"
import CheckIcon from "@heroicons/react/20/solid/CheckIcon"
import TrashIcon from "@heroicons/react/20/solid/TrashIcon"

import { CartItem } from "@api/codegen/graphql"
import useCart from "@lib/hooks/useCart"

import Image from "components/Image"
import Link from "components/Link"
import LoadingSpinner from "components/LoadingSpinner"

type CartItemProps = {
  lineItem: CartItem
  closeModal?: () => void
}

const CartItem = ({ lineItem, closeModal }: CartItemProps) => {
  const {
    state: { updateLoading, removeLoading },
    updateItem,
    removeItem,
  } = useCart()

  let quantity = lineItem?.quantity

  const featuredImage = lineItem.product?.node.image

  const handleQuantityUpdate = async (newQuantity?: number) => {
    // setQuantity(newQuantity)

    newQuantity && (quantity = newQuantity)

    if (quantity && lineItem?.key) {
      await updateItem({
        items: [
          {
            key: lineItem.key,

            quantity,
          },
        ],
      })
    }
  }

  const handleRemoveItem = async (key: string) => {
    await removeItem({ keys: [lineItem.key] })
  }

  return (
    <div className="py-6 relative">
      {lineItem && (
        <li className="flex items-center">
          {featuredImage && (
            <div
              className={`flex-shrink-0 w-16 h-16 md:w-24 md:h-24 border border-gray-200 rounded-md overflow-hidden relative`}
            >
              <Image
                src={featuredImage.sourceUrl ?? ""}
                alt={featuredImage.altText ?? ""}
                fill
                className="object-cover"
                sizes="33vw"
              />
            </div>
          )}

          <div className="ml-3 flex-1 flex flex-col mb-1 justify-between">
            <div className="flex justify-between items-center ">
              <h3 onClick={() => closeModal && closeModal()}>
                <Link
                  href={`/shop/${lineItem.product?.node.slug}`}
                  className="font-bold text-sm text-gray-900"
                >
                  {lineItem.product?.node.name}
                </Link>
              </h3>
              <p className="ml-4 text-xs text-gray-500">{lineItem.total}</p>
            </div>
            <div className="flex divide-x gap-x-2 text-sm text-gray-500">
              {lineItem?.variation?.attributes &&
                lineItem.variation.attributes.map((attribute, i) => (
                  <div
                    key={attribute?.id}
                    className={`${i !== 0 ? "pl-2" : ""}`}
                  >{`${attribute?.value}`}</div>
                ))}
            </div>

            <div className="flex-1 flex items-center justify-between text-sm mt-2">
              {quantity && (
                <Listbox value={quantity} onChange={handleQuantityUpdate}>
                  {({ open }) => (
                    <div className="relative mt-1">
                      <div className="flex items-center">
                        <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent sm:text-sm">
                          <span className="block truncate">{quantity}</span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        {updateLoading?.itemKey === lineItem.key && (
                          <div className="ml-2">
                            <LoadingSpinner size={5} />
                          </div>
                        )}
                      </div>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-36 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number, i) => (
                            <Listbox.Option
                              key={"quantity" + i}
                              className={({ active }) => `${
                                active
                                  ? "text-white bg-accent"
                                  : "text-gray-900"
                              }
                        relative cursor-default select-none py-2 pl-3 pr-9
                      `}
                              value={number}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={`${
                                      selected ? "font-semibold" : "font-normal"
                                    } block truncate`}
                                  >
                                    {number}
                                  </span>

                                  {selected ? (
                                    <span
                                      className={`${
                                        active ? "text-white" : "text-accent"
                                      }
                              absolute inset-y-0 right-0 flex items-center pr-4`}
                                    >
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  )}
                </Listbox>
              )}

              <div className="">
                {removeLoading?.itemKey === lineItem.key ? (
                  <LoadingSpinner style="mr-4" size={4} />
                ) : (
                  <button
                    type="button"
                    title="Remove"
                    className="text-accent hover:text-red-main transition-all"
                    onClick={async () =>
                      lineItem?.key && (await handleRemoveItem(lineItem.key))
                    }
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </li>
      )}
    </div>
  )
}

export default CartItem
