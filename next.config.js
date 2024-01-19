/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true
  },
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.generated.photos',
        port: '',
        pathname: '**'
      }
    ]
  }
}

module.exports = nextConfig
