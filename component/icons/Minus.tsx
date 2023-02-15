import IconComponent, { IconProps } from "./Component"

const MinusIcon = (props: IconProps) => {
	const type = props.type ?? "outline"
	return (
		<IconComponent {...props}>
			{type === "outline" ? (
				<svg
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			) : (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="100%"
					height="100%"
					viewBox="0 0 20 20"
					stroke="currentColor"
				>
					<path
						fillRule="evenodd"
						d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
						clipRule="evenodd"
					/>
				</svg>
			)}
		</IconComponent>
	)
}

export default MinusIcon
