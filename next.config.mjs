/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async redirects() {
    return [
      // Legacy markdown posts (Feb–Mar 2026) were removed in the Sanity migration
      // but still earn impressions in Search Console. Consolidate them instead of 404ing.
      {
        source: '/blog/:slug(2026-0[23]-\\d{2}-.+)',
        destination: '/blog',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
