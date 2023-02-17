import { Cart } from "@api/codegen/graphql"
import { HTMLAttributes } from "react"

type PricingSummaryProps = {
  cart: Cart | null | undefined
  className?: HTMLAttributes<HTMLDListElement>["className"]
}

const PricingSummary = ({ cart, className }: PricingSummaryProps) => {
  return (
    <dl className={className}>
      <div className="flex items-center justify-between">
        <dt className="text-gray-600">Subtotal</dt>
        <dd>{cart?.subtotal}</dd>
      </div>

      <div className="flex items-center justify-between">
        <dt className="text-gray-600">Shipping</dt>
        <dd>{cart?.shippingTotal}</dd>
      </div>

      <div className="flex items-center justify-between">
        <dt className="text-gray-600">Taxes</dt>
        <dd>{cart?.totalTax}</dd>
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 pt-6">
        <dt className="text-base">Total</dt>
        <dd className="text-base">{cart?.total}</dd>
      </div>
    </dl>
  )
}

export default PricingSummary
