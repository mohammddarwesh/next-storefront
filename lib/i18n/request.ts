import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';

// Define routing configuration
const routing = {
  locales: ['en', 'tr'] as const,
  defaultLocale: 'en' as const
};

export default getRequestConfig(async ({ requestLocale }) => {
  // Get the requested locale and fall back to default if not found
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) 
    ? requested 
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default
  };
});

// Re-export for use in other files
export const { locales, defaultLocale } = routing;
export type Locale = typeof locales[number];