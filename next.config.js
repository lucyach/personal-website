/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production';
const repoName = 'personal-website';

const nextConfig = {
  output: 'export', // Ensure static export is enabled
  trailingSlash: true, // Add trailing slashes for GitHub Pages compatibility
  basePath: isProduction ? `/${repoName}` : '', // Conditionally set basePath
  assetPrefix: isProduction ? `/${repoName}` : '', // Conditionally set assetPrefix
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
  // Ensure consistent builds
  poweredByHeader: false,
  // Handle CSS and asset optimization
  experimental: {
    optimizeCss: false, // Prevent CSS optimization issues in static export
  },
};

module.exports = nextConfig;
