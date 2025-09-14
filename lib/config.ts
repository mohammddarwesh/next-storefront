export const siteConfig = {
  name: 'Next Storefront',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ogImage: process.env.NEXT_PUBLIC_SITE_URL + '/og.png' || 'http://localhost:3000/og.png',
  description:
    'Discover amazing products at great prices. Shop now and enjoy fast delivery to your doorstep.',
  links: {
    twitter: '@your-handle',
  },
  keywords: [
    'nextjs',
    'ecommerce',
    'storefront',
    'react',
    'typescript',
    'shadcn-ui',
  ],
};
