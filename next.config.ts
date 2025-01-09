import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['rickandmortyapi.com'],
  },
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
}

export default nextConfig
