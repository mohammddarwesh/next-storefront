import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // Enable React Strict Mode
  reactStrictMode: true,
  
  // Configure images with remote patterns for better security
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // i18n is handled by next-intl
};

export default withNextIntl(nextConfig);
