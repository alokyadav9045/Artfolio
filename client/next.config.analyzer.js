import withBundleAnalyzer from '@next/bundle-analyzer'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing Next.js config
  experimental: {
    // Enable if you want to use the App Router with Sentry
  },
  // Bundle analyzer configuration
  ...(process.env.ANALYZE && {
    webpack: (config) => {
      if (process.env.ANALYZE) {
        console.log('Building with bundle analyzer...')
      }
      return config
    },
  }),
}

export default withBundleAnalyzer(nextConfig)