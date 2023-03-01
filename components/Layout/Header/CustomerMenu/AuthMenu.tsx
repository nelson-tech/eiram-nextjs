"use client"

import { useRouter } from "next/navigation"
import { Popover } from "@headlessui/react"

import useAuth from "@lib/hooks/useAuth"
import customerMenu from "@lib/customerMenu"

import Link from "components/Link"
import LogoutIcon from "components/icons/Logout"

const AuthMenu = ({ close }: { close?: () => void }) => {
  const { logout, context } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    close && close()
    await logout()
  }

  return (
    <>
      {customerMenu.map((menuItem) => {
        return (
          <div key={menuItem.label + menuItem.path} className=" z-10">
            <div>
              <Popover.Button
                as={Link}
                href={menuItem.path}
                title={menuItem.label}
                className="transition-all group flex items-center hover:bg-accent outline-none ring-transparent hover:text-white text-highlight px-4 py-2 text-sm"
              >
                {menuItem.icon({ size: 4, styling: "mr-2" })}
                {menuItem.label}
                {menuItem.label === "Orders" &&
                  context.customer?.orderCount &&
                  context.customer.orderCount > 0 && (
                    <span className="rounded-full bg-accent text-white px-2 text-sm ml-2 group-hover:bg-white group-hover:text-accent transition-all">
                      {context.customer.orderCount}
                    </span>
                  )}
              </Popover.Button>
            </div>
          </div>
        )
      })}
      <div>
        <div
          className="transition flex cursor-pointer w-full items-center outline-none ring-transparent text-red-main px-4 py-2 text-sm hover:bg-red-main hover:text-white"
          onClick={handleLogout}
        >
          <LogoutIcon size={4} styling="mr-1.5" />
          <div className="target">Log out</div>
        </div>
      </div>
    </>
  )
}

export default AuthMenu
