import {
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid"

import { Order } from "@api/codegen/graphql"

import OrderDetails from "components/OrderDetails"
import CheckIcon from "components/icons/Check"

type OrderConfirmationInputType = {
  order: Order
  orderNumber: string | null | undefined
}

const OrderConfirmation = ({
  order,
  orderNumber,
}: OrderConfirmationInputType) => {
  return (
    <>
      <h2 className="text-4xl font-extrabold text-gray-800 text-center">
        {order.status === "FAILED" ? "Uh oh..." : "Thank you!"}
      </h2>

      {order.status === "PROCESSING" ? (
        <div className="flex items-center rounded bg-green-100 shadow w-fit p-2 mt-4 mx-auto">
          <CheckIcon size={8} styling="text-green mr-2" />
          <p className="text-gray-600">Order #{orderNumber} has been placed.</p>
        </div>
      ) : order.status === "PENDING" ? (
        <div className="flex items-center rounded bg-yellow-100 shadow w-fit p-2 mt-4 mx-auto">
          <InformationCircleIcon className="h-8 w-8 text-green mr-2" />
          <div>
            <p className="text-gray-600">
              Your payment requires further authorization before we can process
              your order.
            </p>{" "}
            <p className="text-gray-600">
              Please{" "}
              <a
                href={`mailto:info@eiramknitwear.com?subject=Pending%20Payment%20%7c%20Order%20%23%20${order.id}`}
                title="Contact Us"
                className="text-accent underline hover:text-highlight transition-all"
              >
                contact us
              </a>{" "}
              with your order number (#
              {order.id}) to complete your payment.
            </p>
          </div>
        </div>
      ) : (
        order.status === "FAILED" && (
          <div className="flex items-center rounded bg-red-100 shadow w-fit p-2 mt-4 mx-auto">
            <ExclamationCircleIcon className="h-8 w-8 text-green mr-2" />
            <div>
              <p className="text-gray-600">
                Your payment could not be processed.
              </p>{" "}
              <p className="text-gray-600">
                Please{" "}
                <a
                  href={`mailto:info@eiramknitwear.com?subject=Pending%20Payment%20%7c%20Order%20%23%20${order.id}`}
                  title="Contact Us"
                  className="text-accent underline hover:text-highlight transition-all"
                >
                  contact us
                </a>{" "}
                with your order number (#
                {order.id}) to complete your payment.
              </p>
            </div>
          </div>
        )
      )}

      <div className="mt-6 pt-6 border-t">
        {order ? (
          <OrderDetails order={order} />
        ) : (
          <div className="px-6 text-gray-500">
            <div className="pb-4">
              Order details are only visible on our website for orders placed
              with a customer account. Please{" "}
              <span className="font-bold">save your order number</span> ( #
              {orderNumber} ) for future reference.
            </div>
            <div>
              A sales representative will contact you to finish processing your
              order. If you have any questions, please{" "}
              <a
                href="/about/contact"
                className="underline text-accent hover:text-green transition"
              >
                contact us
              </a>{" "}
              with your order number ( #{orderNumber} ).
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default OrderConfirmation
