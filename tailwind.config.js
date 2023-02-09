const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,css}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			animation: {
				"reverse-spin": "reverse-spin 1s linear infinite",
			},
			keyframes: {
				"reverse-spin": {
					from: {
						transform: "rotate(360deg)",
					},
				},
			},
			colors: {
				electric: "#db00ff",
				ribbon: "#0047ff",
				primary: "var(--primary)",
				text: {
					primary: "var(--text-primary)",
					secondary: "#111",
				},
				"primary-2": "var(--primary-2)",
				secondary: "var(--secondary)",
				"secondary-2": "var(--secondary-2)",
				hover: "var(--hover)",
				violet: { main: "var(--violet)", light: "var(--violet-light)" },
				pink: { main: "var(--pink)" },
				cyan: { main: "var(--cyan)" },
				blue: {
					dark: "#485D7D",
					light: "#6B82A6",
					main: "#5375A0",
				},
				teal: "#32de8a",
				green: { main: "var(--green)" },
				red: { main: "var(--red)" },
				white: "var(--white)",
				accent: "var(--accent)",
				"accent-light": "var(--accent-light)",
				"accent-dark": "var(--accent-dark)",
				black: "var(--black)",
				highlight: "var(--highlight)",
				"highlight-light": "var(--highlight-light)",
				"highlight-dark": "var(--highlight-dark)",
				error: "var(--red)",
			},
			fontFamily: {
				asul: ["Asul", "serif"],
				actor: ["Karla", "serif"],
				sans: ["Karla", ...defaultTheme.fontFamily.sans],
				serif: ["Asul", ...defaultTheme.fontFamily.serif],
			},
		},
	},
	plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
}
