"use client"

import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"

import useModals from "@lib/hooks/useModals"

import LoginForm from "@components/loginForm"
import Modal from "@components/modal"
import ShoppingCart from "@components/shoppingCart/shoppingCart"
import MobileMenu from "@components/mobileMenu"
import { MenuItem } from "@lib/api/codegen/graphql"

type ModalsInputType = { menuItems: MenuItem[] }

const Modals = ({ menuItems }: ModalsInputType) => {
	const { send, matches } = useModals()

	const closeModal = () => {
		send("close")
	}

	return (
		<>
			<Modal open={matches("loginOpen")} closeModal={closeModal}>
				<LoginForm />
			</Modal>

			{/* <!-- Shopping Cart--> */}
			<Transition show={matches("shoppingCartOpen")}>
				<Dialog as="div" className="fixed inset-0 z-40" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="transition-opacity ease-linear duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					<ShoppingCart closeModal={closeModal} />
				</Dialog>
			</Transition>

			{/* <!-- Mobile Menu --> */}
			<Transition show={matches("mobileMenuOpen")}>
				<Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="transition-opacity ease-linear duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					<MobileMenu menuItems={menuItems} closeModal={closeModal} />
				</Dialog>
			</Transition>
		</>
	)
}

export default Modals
