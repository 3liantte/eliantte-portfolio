/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ allow production build to proceed
  },
};

module.exports = nextConfig;
