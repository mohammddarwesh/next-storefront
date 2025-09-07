export const locales = ['en', 'tr'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];

export const routing = {
  locales: [...locales],
  defaultLocale,
  localePrefix: 'as-needed',
  pathnames: {
    // Main pages
    '/': {
      en: '/',
      tr: '/'
    },
    '/products': {
      en: '/products',
      tr: '/urunler',
    },
    '/cart': {
      en: '/cart',
      tr: '/sepet',
    },
    // Dynamic routes
    '/products/category/[slug]': {
      en: '/products/category/[slug]',
      tr: '/urunler/kategori/[slug]',
    },
    '/products/[slug]': {
      en: '/products/[slug]',
      tr: '/urunler/[slug]',
    },
  },
} as const;
