/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tokens.1inch.io',
      },
      {
        protocol: 'https',
        hostname: 'cdn.1inch.io',
      },
    ],
  },
};

module.exports = nextConfig;
