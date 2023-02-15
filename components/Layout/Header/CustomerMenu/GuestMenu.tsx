import useModals from "@lib/hooks/useModals"
import Link from "components/Link"

import ClipboardCheckIcon from "components/icons/ClipboardCheck"
import LoginIcon from "components/icons/Login"

const GuestMenu = () => {
	const { send } = useModals()
	return (
		<div>
			<div>
				<button
					onClick={() => {
						send("openLogIn")
					}}
					className="transition w-full cursor-pointer flex items-center outline-none ring-transparent text-highlight px-4 py-2 text-sm hover:bg-highlight hover:text-white"
				>
					<LoginIcon size={4} styling="mr-1.5" />
					<div className="target">Log in</div>
				</button>
			</div>
			<div>
				<div className="group">
					<Link
						href="/register"
						className="transition flex items-center text-accent-dark outline-none ring-transparent px-3.5 py-2 text-sm hover:bg-accent hover:text-white"
					>
						<ClipboardCheckIcon size={4} styling="mr-2" />

						<div className="target">Register</div>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default GuestMenu
