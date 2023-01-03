import Link from "@components/Link"
import { Dialog, Transition } from "@headlessui/react"

import XIcon from "@icons/X"
import { Fragment } from "react"

type MobileMenuInputType = {
	menuItems: MenuItem[]
	closeModal: (() => void) | undefined
}

const MobileMenu = ({ menuItems, closeModal }: MobileMenuInputType) => {
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
					<div className="w-screen max-w-md relative" style={{ maxWidth: "350px" }}>
						<div className="relative w-full bg-white h-screen shadow-xl pb-12 flex flex-col overflow-y-auto max-w-sm">
							<div className="p-4 flex" onClick={() => closeModal && closeModal()}>
								<button
									type="button"
									className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400 outline-none ring-transparent"
								>
									<span className="sr-only">Close menu</span>
									<XIcon size={6} />
								</button>
							</div>

							{/* <!-- Links --> */}
							<div className="border-t border-gray-200 py-6">
								{menuItems &&
									menuItems.length > 0 &&
									menuItems.map((menuItem) => {
										if (menuItem && !menuItem.post_parent && menuItem.child_items?.length > 0) {
											return (
												<div className="flow-root pt-1">
													<div className={bigLinkStyle} title={menuItem.title}>
														{menuItem.title}
													</div>
													<div className="pt-2">
														{menuItem.child_items.map((child) => {
															if (child) console.log("CHILD", child)

															return (
																<div
																	className="font-bold text-sm text-gray-600 transition px-8 hover:bg-accent hover:text-white"
																	onClick={() => closeModal && closeModal()}
																>
																	<Link href={child.url} title={child.title} className="">
																		<div className="w-full py-3">{child.title}</div>
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
													<Link href={menuItem.url} title={menuItem.title} className="h-full py-3">
														<div className="w-full py-3">{menuItem.title}</div>
													</Link>
												</div>
											</div>
										)
									})}
							</div>
						</div>
					</div>
				</Transition.Child>
			</Dialog.Panel>
		</>
	)
}

export default MobileMenu
