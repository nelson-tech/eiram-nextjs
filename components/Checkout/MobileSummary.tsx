import { Popover, Transition } from "@headlessui/react"

import { Cart } from "@api/codegen/graphql"

import ChevronUpIcon from "@heroicons/react/20/solid/ChevronUpIcon"
import { Fragment } from "react"
import PricingSummary from "./PricingSummary"

type MobileSummaryProps = {
  hidePrices?: boolean
  discounts?: boolean
  cart: Cart | null | undefined
}

const MobileSummary = ({
  hidePrices = false,
  discounts = false,
  cart,
}: MobileSummaryProps) => {
  return (
    <Popover className="fixed inset-x-0 z-10 bottom-0 flex flex-col-reverse text-sm font-medium text-gray-900 lg:hidden">
      <div className="relative z-10 border-t border-gray-200 bg-white px-4 sm:px-6">
        <div className="mx-auto max-w-lg">
          <Popover.Button className="flex w-full items-center py-6 font-medium ring-0 focus:outline-none">
            <span className="mr-auto text-base">Total</span>
            <span className="mr-2 text-base">{cart?.total}</span>
            <ChevronUpIcon
              className="h-5 w-5 text-gray-500"
              aria-hidden="true"
            />
          </Popover.Button>
        </div>
      </div>

      <Transition.Root as={Fragment}>
        <div>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-50"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-50"
            leaveTo="opacity-0"
          >
            <Popover.Overlay className="fixed inset-0 bg-accent bg-opacity-50" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-y-full"
            enterTo="translate-y-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-y-0"
            leaveTo="translate-y-full"
          >
            <Popover.Panel className="relative bg-white px-4 py-6 sm:px-6">
              <PricingSummary
                cart={cart}
                className="mx-auto max-w-lg space-y-6"
              />
            </Popover.Panel>
          </Transition.Child>
        </div>
      </Transition.Root>
    </Popover>
  )
}

export default MobileSummary
