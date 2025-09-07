import { headers } from 'next/headers';

export async function buildCanonicalUrl(path: string, locale: string): Promise<string> {
  const headersList = await headers();
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const host = headersList.get('host') || 'localhost:3000';
  return `${protocol}://${host}/${locale}${path}`;
}

export function getBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return '';
  }
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  return `${protocol}://${process.env.VERCEL_URL || 'localhost:3000'}`;
}
