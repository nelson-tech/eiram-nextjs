import Link from "@components/Link"
import { Dialog, Transition } from "@headlessui/react"
import ClipboardCheckIcon from "@icons/ClipboardCheck"
import LoginIcon from "@icons/Login"
import LogoutIcon from "@icons/Logout"

import XIcon from "@icons/X"
import { MenuItem } from "@lib/api/codegen/graphql"
import useAuth from "@lib/hooks/useAuth"
import userMenu from "@lib/userMenu"
import { Fragment } from "react"

type MobileMenuInputType = {
	menuItems: MenuItem[]
	closeModal: (() => void) | undefined
}

const MobileMenu = ({ menuItems, closeModal }: MobileMenuInputType) => {
	const { isAuth, context, logout } = useAuth()

	const handleLogout = async () => {
		await logout()
	}

	const bigLinkStyle = "font-extrabold uppercase tracking-wider text-gray-800 pl-4"

	return (
		<>
			<Dialog.Panel className="md:max-w-full flex">
				<Transition.Child
					enter="transition ease-in-out duration-300 transform"
					enterFrom="-translate-x-full"
					enterTo="translate-x-0"
					leave="transition ease-in-out duration-300 transform"
					leaveFrom="translate-x-0"
					leaveTo="-translate-x-full"
					as={Fragment}
				>
					<div className="relative bg-white h-screen shadow-xl flex flex-col overflow-y-auto mr-4">
						<div className="p-4 flex " onClick={() => closeModal && closeModal()}>
							<button
								type="button"
								className="inline-flex items-center justify-center text-gray-400 hover:text-red-main transition-all outline-none ring-transparent"
							>
								<span className="sr-only">Close menu</span>
								<XIcon size={6} />
							</button>
						</div>

						{/* <!-- Links --> */}
						<div className="border-t border-gray-200 py-6 mr-16 w-full">
							{menuItems &&
								menuItems.length > 0 &&
								menuItems.map((menuItem) => {
									if (menuItem && menuItem.childItems?.nodes?.length > 0) {
										return (
											<div className="flow-root pt-2">
												<div className={bigLinkStyle} title={menuItem.label}>
													{menuItem.label}
												</div>
												<div className="pt-2">
													{menuItem.childItems.nodes.map((child: MenuItem) => {
														return (
															<div
																className="font-bold text-sm text-gray-600 transition px-8 hover:bg-accent hover:text-white"
																onClick={() => closeModal && closeModal()}
																key={child.id}
															>
																<Link href={child.url} title={child.label} className="">
																	<div className="w-full py-3">{child.label}</div>
																</Link>
															</div>
														)
													})}
												</div>
											</div>
										)
									}
									return (
										<div className="flow-root">
											<div
												className={bigLinkStyle + " hover:bg-accent hover:text-white"}
												onClick={() => closeModal && closeModal()}
											>
												<Link href={menuItem.url} title={menuItem.label} className="h-full py-3">
													<div className="w-full py-3">{menuItem.label}</div>
												</Link>
											</div>
										</div>
									)
								})}

							{/* User Menu */}
							<div className="border-t border-gray-200 py-6 text-sm font-md text-gray-600">
								{isAuth ? (
									<>
										{context.user?.firstName && (
											<p className="px-4 mb-4">Hello, {context.user.firstName}!</p>
										)}
										{userMenu.map((item) => {
											return (
												<div className="outline-none" onClick={() => closeModal && closeModal()}>
													<a
														href={item.path}
														title={item.label}
														className="transition-all group flex items-center px-3.5 py-2 hover:bg-accent hover:text-white"
													>
														<item.icon size={6} styling="mr-4" />
														<div>{item.label}</div>
														{item.label === "Orders" && (
															<span className="rounded-full bg-accent text-white px-2 text-sm ml-2 group-hover:bg-white group-hover:text-accent transition-all">
																{context.orderCount}
															</span>
														)}
													</a>
												</div>
											)
										})}{" "}
										<div onClick={handleLogout} title="Logout" className="transition outline-none">
											<div className="flex items-center w-full px-4 py-2 transition text-red-main hover:bg-red-main hover:text-white cursor-pointer">
												<LogoutIcon size={6} styling="mr-3.5" />
												Logout
											</div>
										</div>
									</>
								) : (
									<>
										<div className="group" onClick={() => closeModal && closeModal()}>
											<a
												href="/register"
												title="Register"
												className="transition flex items-center outline-none px-3.5 py-2 hover:bg-accent hover:text-white"
											>
												<ClipboardCheckIcon size={6} styling="mr-4" />
												<div>Register</div>
											</a>
										</div>
										<div onClick={() => closeModal && closeModal()} className="group">
											<a
												href="/login"
												title="Log in"
												className="transition flex items-center outline-none text-green-main px-4 py-2 hover:bg-green-main hover:text-white"
											>
												<LoginIcon size={6} styling="mr-3.5" />
												<div>Log in</div>
											</a>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</Transition.Child>
			</Dialog.Panel>
		</>
	)
}

export default MobileMenu
