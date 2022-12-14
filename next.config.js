/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  images: {
    unoptimized : true // not compatible with GitHub Actions
  },
  assetPrefix: "/",
}

module.exports = nextConfig