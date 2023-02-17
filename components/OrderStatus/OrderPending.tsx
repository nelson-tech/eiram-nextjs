type OrderPendingPropsType = {
  orderNumber: string | null | undefined
}

const OrderPending = ({ orderNumber }: OrderPendingPropsType) => {
  return (
    <div id="order-pending" className="space-y-8">
      <p className="mt-2 text-2xl font-bold tracking-tight sm:text-4xl">
        We&apos;ve received your order!
      </p>
      <div className="mt-2 text-base text-gray-500">
        <p>
          Your order #{orderNumber} has been received, but the payment was
          incomplete.
        </p>
        <p className="text-base text-gray-500 bg-yellow-50 rounded-md p-4 mt-8">
          Please{" "}
          <a
            href={`mailto:info@eiramknitwear.com?Subject=Payment%20Update%20for%20Order%20#${orderNumber}`}
            className="underline text-accent hover:text-accent transition-colors"
          >
            contact us
          </a>{" "}
          with your order number to complete your payment so we can get your
          order to you as quickly as possible.
        </p>
      </div>
    </div>
  )
}

export default OrderPending
