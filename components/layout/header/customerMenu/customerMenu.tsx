"use client"

import { Popover, Transition } from "@headlessui/react"
import UserIcon from "@icons/User"
import AuthMenu from "./authMenu"
import GuestMenu from "./guestMenu"
import LoadingSpinner from "@components/LoadingSpinner"
import useAuth from "@lib/hooks/useAuth"

const UserMenu = () => {
	const { processing, isAuth } = useAuth()
	return (
		<div className="hidden lg:flex">
			<Popover as="div" className="relative font-sans h-full">
				<Popover.Button
					className={
						(isAuth ? "text-accent" : "text-gray-400") +
						" py-2 hover:text-gray-500" +
						" font-bold text-sm h-full outline-none transition-all"
					}
				>
					<div title="User Menu" className="mt-0.5">
						<span className="sr-only">Open customer menu</span>
						{processing ? (
							<LoadingSpinner size={6} />
						) : (
							<UserIcon type={isAuth ? "solid" : "outline"} />
						)}
					</div>
				</Popover.Button>

				<Transition
					enter="transition ease-out duration-200"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition ease-in duration-150"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
					className="origin-top-right absolute -right-16 pt-2 w-40 z-40"
				>
					<Popover.Panel className="relative rounded-sm bg-gray-50 outline-none overflow-hidden shadow-lg ring-transparent z-40">
						{isAuth ? <AuthMenu /> : <GuestMenu />}
					</Popover.Panel>
				</Transition>
			</Popover>
		</div>
	)
}

export default UserMenu
