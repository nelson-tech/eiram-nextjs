"use client"

import { useEffect } from "react"
import { Menu_Sitesettings_Colors } from "@lib/api/codegen/graphql"

export default function RootStyleRegistry({
	children,
	colors,
}: {
	children: React.ReactNode
	colors: Menu_Sitesettings_Colors
}) {
	const hexHueGenerator = (hexColor: string, luminance: number) => {
		hexColor = hexColor.replace(`#`, ``)
		const magnitude = luminance || 0
		if (hexColor.length === 6) {
			const decimalColor = parseInt(hexColor, 16)
			let r = (decimalColor >> 16) + magnitude
			r > 255 && (r = 255)
			r < 0 && (r = 0)
			let g = (decimalColor & 0x0000ff) + magnitude
			g > 255 && (g = 255)
			g < 0 && (g = 0)
			let b = ((decimalColor >> 8) & 0x00ff) + magnitude
			b > 255 && (b = 255)
			b < 0 && (b = 0)
			return `#${(g | (b << 8) | (r << 16)).toString(16)}`
		} else {
			return hexColor
		}
	}

	useEffect(() => {
		if (colors) {
			for (let [prop, givenColor] of Object.entries(colors)) {
				let color = givenColor || ""
				if (["highlight", "accent"].includes(prop)) {
					color = colors[color as keyof typeof colors] || ""
				}

				if (prop && color) {
					const varString = `--${prop}`
					document.documentElement.style.setProperty(varString, color)

					// Set light variations
					const varStringLight = `--${prop}-light`
					const colorLight = hexHueGenerator(color, 20)
					document.documentElement.style.setProperty(varStringLight, colorLight)

					// Set dark variations
					const varStringDark = `--${prop}-dark`
					const colorDark = hexHueGenerator(color, -20)

					document.documentElement.style.setProperty(varStringDark, colorDark)
				}
			}
		}
	}, [colors])

	return <div id="style-registry">{children}</div>
}
