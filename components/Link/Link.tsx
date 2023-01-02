import { HTMLProps } from "react"
import NextLink from "next/link"

// ####
// #### Types
// ####

export type PropsType = HTMLProps<HTMLAnchorElement> & { passHref?: boolean }

// ####
// #### Component
// ####

const Link = ({
	href,
	title,
	target,
	className,
	children,
	onClick,
	passHref = false,
	...rest
}: PropsType) => {
	return (
		<NextLink
			href={href || ""}
			title={title}
			target={target}
			onClick={onClick}
			passHref
			id="nextlink"
			className={className}
		>
			{children}
		</NextLink>
	)
}

export default Link
