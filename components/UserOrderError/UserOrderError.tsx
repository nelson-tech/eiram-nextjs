"use client"

import useAuth from "@lib/hooks/useAuth"

import Link from "components/Link"

const UserOrderError = () => {
  const { isAuth } = useAuth()

  return isAuth ? (
    <div className="mt-8 text-center text-gray-500">
      <p>
        You can view your previous orders from the{" "}
        <Link
          href="/orders"
          className="text-accent hover:text-highlight transition underline"
        >
          dashboard
        </Link>
        .
      </p>
    </div>
  ) : (
    <></>
  )
}

export default UserOrderError
