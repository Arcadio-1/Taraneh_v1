/** @type {import('next').NextConfig} */

const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
  buildExcludes: [/middleware-manifest.json$/],
  disable: process.env.NODE_ENV === "development",
});

// const nextConfig = {
//   images: {
//     remotePatterns: [
//       { hostname: "images.unsplash.com" },
//       { hostname: "lh3.googleusercontent.com" },
//     ],
//   },
// };
const nextConfig = withPWA({
  // logging: {
  //   fetches: {
  //     fullUrl: true,
  //   },
  // },
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "lh3.googleusercontent.com" },
    ],
  },
  // next config
  // experimental: {
  //   serverActions: true,
  // },
});

module.exports = nextConfig;
