import { routing } from './i18n/routing';

declare global {
  // Extend the next-intl module with our locale types
  declare module 'next-intl' {
    interface AppConfig {
      Locale: (typeof routing.locales)[number];
    }
  }

  // Make sure Next.js knows about our params
  declare module 'next' {
    interface Params {
      locale: (typeof routing.locales)[number];
    }
  }
}