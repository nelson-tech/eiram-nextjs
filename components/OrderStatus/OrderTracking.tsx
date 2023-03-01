import { LinkIcon } from "@heroicons/react/20/solid"

import { Order_Tracking } from "@api/codegen/graphql"

type OrderTrackingPropsType = {
  tracking: Order_Tracking
  orderNumber: string | null | undefined
}

const OrderTracking = ({ tracking, orderNumber }: OrderTrackingPropsType) => {
  return (
    <div id="order-tracking" className="space-y-8">
      <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
        It&apos;s on the way!
      </p>
      <p className="mt-2 text-base text-gray-500">
        Your order #{orderNumber} shipped on {tracking.date} and will be with
        you soon.
      </p>

      <dl className="text-sm font-medium">
        <dt className="text-gray-900">Tracking number</dt>
        <dd className="mt-2 text-accent hover:text-highlight transition-colors">
          <a
            href={tracking.url ?? ""}
            title={`View tracking details via ${tracking.provider}`}
            rel="noreferrer"
            target="_blank"
          >
            <span className="flex items-center">
              <LinkIcon className="h-5 w-5 mr-4" />
              {tracking.number}
            </span>
          </a>
        </dd>
      </dl>
    </div>
  )
}

export default OrderTracking
