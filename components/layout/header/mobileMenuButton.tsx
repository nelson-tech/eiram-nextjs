"use client"

import useModals from "@lib/hooks/useModals"

import MenuIcon from "@icons/Menu"

const MobileMenuButton = () => {
	const { send } = useModals()

	return (
		<button
			type="button"
			className="-ml-2 bg-white p-2 rounded-md text-gray-400"
			onClick={() => send("openMobileMenu")}
		>
			<span className="sr-only">Open menu</span>
			<MenuIcon size={6} />
		</button>
	)
}

export default MobileMenuButton
