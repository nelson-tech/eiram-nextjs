import type { Metadata } from "next/dist/lib/metadata/types/metadata-interface"

import getOrderById from "@lib/server/getOrderById"

import AuthChecker from "components/AuthChecker"
import Link from "components/Link"
import OrderDetails from "components/OrderDetails"
import ArrowLeftIcon from "components/icons/ArrowLeft"

type OrderPageParamsType = { params: { id: string } }

const OrderPage = async ({ params }: OrderPageParamsType) => {
  const order = await getOrderById(params.id)

  return (
    <>
      <AuthChecker redirect="/shop" />
      <div className="max-w-7xl mx-auto py-8 px-8 sm:px-6 lg:pb-24 lg:px-8">
        <div className="max-w-xl">
          <div className="w-full relative flex items-center">
            <Link
              className="mr-4 text-gray-600 cursor-pointer hover:text-green-main transition"
              title="Return to orders"
              href="/orders"
            >
              <h2 className="sr-only">Return to orders</h2>
              <ArrowLeftIcon size={6} type="solid" />
            </Link>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Order Details
            </h1>
          </div>
        </div>
        <div className="mt-16">
          <h2 className="sr-only">Order details</h2>

          <div className="space-y-8">
            <OrderDetails order={order} />
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderPage

export const revalidate = 0 // dynamically serve this page

export async function generateMetadata({
  params,
}: OrderPageParamsType): Promise<Metadata> {
  const order = await getOrderById(params?.id)
  const metaData = {
    title: order?.orderNumber ? `Order #${order.orderNumber}` : "Order Details",
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
