"use client"

import { Menu, Transition } from "@headlessui/react"
import ChevronDownIcon from "components/icons/ChevronDown"
import Link from "components/Link"

import { usePathname } from "next/navigation"
import { MenuItem } from "@lib/api/codegen/graphql"
type DesktopLinkStyleProps = {
	open: boolean
	target: string
}

type GetDesktopLinkStyleType = ({ open, target }: DesktopLinkStyleProps) => string

const MainMenu = ({ menuItems }: { menuItems: MenuItem[] }) => {
	const path = usePathname()

	const getDesktopLinkStyle: GetDesktopLinkStyleType = ({ open, target }): string => {
		const current = path.slice(0, target.length) === target && target !== "/"
		return `transition ease-out duration-200 outline-none px-3 uppercase ${
			open ? "border-accent text-accent" : "text-gray-600 hover:text-accent-dark"
		} flex items-center text-sm font-medium transition-all h-full tracking-[.15em]`
	}

	return (
		<div className="hidden h-full lg:flex lg:justify-center w-full">
			<div className="h-full flex justify-center items-center space-x-2">
				{menuItems &&
					menuItems.map((menuItem, i) => {
						if (menuItem) {
							const target = menuItem.url

							if ((menuItem.childItems?.nodes?.length || 0) > 0) {
								return (
									<Menu
										key={menuItem.id}
										as="div"
										className="relative flex h-full transition hover-underline-animation"
									>
										{({ open }) => (
											<>
												<Menu.Button
													className={getDesktopLinkStyle({
														open,
														target,
													})}
												>
													{menuItem.label}
													<ChevronDownIcon
														size={4}
														styling={`transition ml-1 text-gray-400 ${
															open ? "transform rotate-180" : ""
														}`}
													/>
												</Menu.Button>

												<Transition
													enter="transition ease-out duration-200"
													enterFrom="opacity-0"
													enterTo="opacity-100"
													leave="transition ease-in duration-150"
													leaveFrom="opacity-100"
													leaveTo="opacity-0"
													className="origin-top absolute -left-1/2 pt-2 w-64"
												>
													<Menu.Items className="rounded-sm bg-gray-50 outline-none overflow-hidden shadow-lg ring-transparent z-40">
														{menuItem.childItems?.nodes &&
															menuItem.childItems.nodes.map((item: MenuItem, i) => {
																if (item && item && item.id && item.label) {
																	return (
																		<Menu.Item key={item?.id + i}>
																			{({ close }) => (
																				<Link
																					href={item.url}
																					title={item.label}
																					passHref={false}
																					onClick={close}
																					className="transition hover:bg-accent hover:text-white text-highlight block px-4 py-2 text-sm ring-transparent outline-none"
																				>
																					{item.label}
																				</Link>
																			)}
																		</Menu.Item>
																	)
																}
															})}
													</Menu.Items>
												</Transition>
											</>
										)}
									</Menu>
								)
							}

							return (
								<div
									className="relative flex h-full transition hover-underline-animation"
									key={menuItem.id}
								>
									<Link
										href={target}
										title={menuItem?.label || ""}
										className={getDesktopLinkStyle({
											open: false,
											target,
										})}
									>
										{menuItem?.label}
									</Link>
								</div>
							)
						}
					})}
			</div>
		</div>
	)
}

export default MainMenu
