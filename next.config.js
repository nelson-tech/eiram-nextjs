/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ["cdn.eiramknitwear.com", "api.eiramknitwear.com", "shy.nelson.tech"],
		loader: "custom",
		loaderFile: "lib/utils/imageLoader.ts",
	},
	compiler: {
		removeConsole: process.env.NODE_ENV === "production",
	},
}

module.exports = nextConfig
