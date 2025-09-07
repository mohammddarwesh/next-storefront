export async function getBaseUrl(): Promise<string> {
  if (typeof window !== 'undefined') return '';
  
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const host = process.env.VERCEL_URL || 'localhost:3000';
  return `${protocol}://${host}`;
}

export async function buildCanonicalUrl(path: string, locale: string): Promise<string> {
  const baseUrl = await getBaseUrl();
  // Ensure path starts with a slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}/${locale}${normalizedPath}`;
}
