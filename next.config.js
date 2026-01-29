/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Ensure static export is enabled
  trailingSlash: true, // Add trailing slashes for GitHub Pages compatibility
  basePath: process.env.NODE_ENV === 'production' ? '/personal-website' : '', // Conditionally set basePath
  assetPrefix: process.env.NODE_ENV === 'production' ? '/personal-website' : '', // Remove trailing slash from assetPrefix
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
};

module.exports = nextConfig;
