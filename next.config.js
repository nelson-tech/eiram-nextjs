/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ["cdn.eiramknitwear.com", "api.eiramknitwear.com", "shy.nelson.tech"],
	},
}

module.exports = nextConfig
