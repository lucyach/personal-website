/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Ensure static export is enabled
  trailingSlash: true, // Add trailing slashes for GitHub Pages compatibility
  basePath: '/personalwebsite', // Replace with your repository name
  assetPrefix: '/personalwebsite/', // Prefix assets for GitHub Pages
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
};

module.exports = nextConfig;
