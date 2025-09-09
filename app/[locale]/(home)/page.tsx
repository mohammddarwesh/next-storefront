import { getTranslations } from 'next-intl/server';
import ProductsSection from '@/components/home/ProductsSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import { siteConfig } from '@/lib/config';
import { absoluteUrl, buildCanonicalUrl } from '@/lib/utils/url';
import { Metadata } from 'next';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Home' });
  const pageTitle = t('title');
  const pageDescription = t('description');

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: buildCanonicalUrl('', locale),
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: 'website',
      url: absoluteUrl(`/${locale}`),
    },
  };
}

export default async function HomePage() {
  const [tCommon, tHome] = await Promise.all([
    getTranslations('Common'),
    getTranslations('Home')
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: absoluteUrl('/'),
  };

  // Fetch featured products with error boundary

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            {tCommon('welcome', { name: 'Next Storefront' })}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {tHome('description')}
          </p>
        </div>
      </section>

      {/* Products Section */}
      <ProductsSection />

      {/* Features Section */}
      <FeaturesSection />
    </div>
  );
}
