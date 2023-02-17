/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["cross-fetch"],
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "cdn.eiramknitwear.com",
      "api.eiramknitwear.com",
      "eiramknitwear.com",
    ],
    loader: "custom",
    loaderFile: "lib/utils/imageLoader.ts",
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
}

module.exports = nextConfig
