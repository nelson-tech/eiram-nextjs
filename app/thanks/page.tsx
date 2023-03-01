import { Metadata } from "next/types"

import getOrderById from "@lib/server/getOrderById"

import OrderConfirmation from "components/OrderConfirmation"
import UserOrderError from "components/UserOrderError"

type ThanksPageParamsType = { searchParams?: { orderNumber: string } }

const ThanksPage = async ({ searchParams }: ThanksPageParamsType) => {
  const order = await getOrderById(searchParams?.orderNumber)

  return (
    <div className="max-w-7xl mx-auto">
      <div className="py-8 px-6 w-full h-full">
        {order ? (
          <OrderConfirmation
            order={order}
            orderNumber={searchParams?.orderNumber}
          />
        ) : (
          <>
            <div>
              <h2 className="text-xl font-extrabold text-gray-400 text-center">
                <p>Oops, no order found...</p>
                <p>
                  Please{" "}
                  <a
                    href={`mailto:info@eiramknitwear.com?subject=Missing%20Order${
                      searchParams?.orderNumber
                        ? `%20%23%20${searchParams?.orderNumber}`
                        : ""
                    }`}
                    title="Contact Us"
                    className="text-accent underline hover:text-highlight transition-all"
                  >
                    contact us
                  </a>{" "}
                  if you think there&apos;s been a mistake.
                </p>
              </h2>
            </div>
            <UserOrderError />
          </>
        )}
      </div>
    </div>
  )
}

export default ThanksPage

export const revalidate = 0 // dynamically serve this page

export async function generateMetadata(
  params: ThanksPageParamsType
): Promise<Metadata> {
  let orderNumber: string | null | undefined
  try {
    const order = await getOrderById(params?.searchParams?.orderNumber)
    order?.orderNumber && (orderNumber = order?.orderNumber)
  } catch (error) {}

  const metaData = {
    title: orderNumber
      ? `Order #${orderNumber} Confirmation`
      : `Order Confirmation`,
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    },
  }

  return metaData
}
