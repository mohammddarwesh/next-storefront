import { siteConfig } from '@/lib/config';

export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path}`;
}

export function buildCanonicalUrl(path: string, locale: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.url}/${locale}${normalizedPath}`;
}
