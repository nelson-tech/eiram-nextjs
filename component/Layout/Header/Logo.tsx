import Link from "component/Link"
import Image from "component/Image"

const Logo = ({ mobile }: { mobile?: boolean }) => {
	if (mobile) {
		return (
			<div className="flex ml-4 items-center w-full justify-center lg:hidden">
				<Link href="/" className="lg:hidden">
					<span className="sr-only">Workflow</span>
					<Image
						src={process.env.NEXT_PUBLIC_CDN_BASE_URL + "/eiram/20220901154005/logo-black.png"}
						alt="Eiram Knitwear Logo"
						className="h-8 w-auto"
						width={500}
						height={150}
					/>
				</Link>
			</div>
		)
	}
	return (
		<div className="hidden lg:flex items-center w-36">
			<Link href="/">
				<span className="sr-only">Workflow</span>
				<Image
					className="h-8 w-auto"
					src={process.env.NEXT_PUBLIC_CDN_BASE_URL + "/eiram/20220901154005/logo-black.png"}
					alt="Eiram Knitwear Logo"
					width={500}
					height={150}
				/>
			</Link>
		</div>
	)
}

export default Logo
