import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    typescript: {
      ignoreBuildErrors: true
    },
    eslint: {
        ignoreDuringBuilds: true
    },
  images: {
      remotePatterns: [
          {
                protocol: 'https',
                hostname: 'img.clerk.com',
                pathname: '/**'
            }
      ]
  }
};

export default nextConfig;
