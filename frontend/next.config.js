/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  // Configuration pour GitHub Pages
  output: 'export',
  trailingSlash: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? '/candidate-management-system/' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/candidate-management-system' : '',
}

module.exports = nextConfig 