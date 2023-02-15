"use client"

import useScrollDirection from "@lib/hooks/useScrollDirection"
import { MenuItem } from "@lib/api/codegen/graphql"

import Logo from "./Logo"
import MainMenu from "./MainMenu"
import UserMenu from "./CustomerMenu"
import ShoppingCartButton from "./ShoppingCartButton"
import MobileMenuButton from "./MobileMenuButton"

type HeaderInputType = { menuItems: MenuItem[] }

const Header = ({ menuItems }: HeaderInputType) => {
	const scrollDirection = useScrollDirection()

	return (
		<header
			className={`z-30 sticky ${
				scrollDirection === "down" ? "-top-24" : "top-0"
			} transition-all duration-500`}
		>
			<nav aria-label="Top">
				<div className="bg-white bg-opacity-100">
					<div className="border-b border-gray-200">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<div className="h-16 flex items-center justify-between rounded-sm">
								{/* Logo (lg+) */}
								<Logo />
								<MainMenu menuItems={menuItems} />

								{/* Mobile menu and search (lg-) */}
								<div className="flex-1 flex items-center lg:hidden">
									<MobileMenuButton />
								</div>

								{/* Logo (lg-) */}
								<Logo mobile />

								<div className="flex items-center h-full">
									<UserMenu />

									<span
										className="hidden lg:block mx-2 h-6 w-px bg-gray-200 lg:mx-6"
										aria-hidden="true"
									/>

									<div className="flow-root">
										<ShoppingCartButton />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="text-sm w-full text-center bg-gray-50 border-b py-1 text-accent">
					Statement-driven, sustainable knitwear.
				</div>
			</nav>
		</header>
	)
}

export default Header
