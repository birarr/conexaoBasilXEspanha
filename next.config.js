/** @type {import('next').NextConfig} */
const nextConfig = {
 images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
    env: {
    LOCAL_PASS: process.env.LOCAL_PASS,
  }
};

module.exports = nextConfig;
