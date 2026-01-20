/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@open-sparkle/shared"],
  outputFileTracingRoot: require("path").join(__dirname, "../.."),
};

module.exports = nextConfig;
