/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Ensure static export is enabled
  trailingSlash: true, // Add trailing slashes for GitHub Pages compatibility
  basePath: process.env.NODE_ENV === 'production' ? '/personalwebsite' : '', // Conditionally set basePath
  assetPrefix: process.env.NODE_ENV === 'production' ? '/personalwebsite/' : '', // Conditionally set assetPrefix
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
};

module.exports = nextConfig;
