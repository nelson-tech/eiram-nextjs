"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Popover } from "@headlessui/react"

import useAuth from "@lib/hooks/useAuth"
import userMenu from "@lib/userMenu"
import Link from "@components/Link"

import LogoutIcon from "@icons/Logout"

const AuthMenu = () => {
	const { logout, matches, context } = useAuth()
	const router = useRouter()

	const handleLogout = async () => {
		await logout()
	}

	// useEffect(() => {
	// 	if (matches("loggedOut")) {
	// 		router.push("/")
	// 	}
	// }, [matches, router])

	return (
		<>
			{userMenu.map((menuItem) => {
				return (
					<div key={menuItem.label + menuItem.path} className=" z-10">
						<div>
							<Link
								href={menuItem.path}
								title={menuItem.label}
								className="transition-all group flex items-center hover:bg-accent outline-none ring-transparent hover:text-white text-highlight px-4 py-2 text-sm"
							>
								{menuItem.icon({ size: 4, styling: "mr-2" })}
								{menuItem.label}
								{menuItem.label === "Orders" && (
									<span className="rounded-full bg-accent text-white px-2 text-sm ml-2 group-hover:bg-white group-hover:text-accent transition-all">
										{context.user.orderCount}
									</span>
								)}
							</Link>
						</div>
					</div>
				)
			})}
			<div>
				<Popover.Button
					as="button"
					className="transition flex cursor-pointer w-full items-center outline-none ring-transparent text-red-main px-4 py-2 text-sm hover:bg-red-main hover:text-white"
					onClick={handleLogout}
				>
					<LogoutIcon size={4} styling="mr-1.5" />
					<div className="target">Log out</div>
				</Popover.Button>
			</div>
		</>
	)
}

export default AuthMenu
