import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

console.log('GitHub Pages Build:', isGitHubPages);

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  assetPrefix: isGitHubPages ? '/ims-tailwind/' : undefined,
  basePath: isGitHubPages ? '/ims-tailwind' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
