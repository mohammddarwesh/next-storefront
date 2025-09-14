import { getTranslations } from 'next-intl/server';
import ProductsSection from '@/components/home/ProductsSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import { siteConfig } from '@/lib/config';
import { absoluteUrl, buildCanonicalUrl } from '@/lib/utils/url';
import { Metadata } from 'next';
import { getProducts } from '@/lib/api/getProducts';
import { routing } from '@/lib/i18n/routing';
import { Product } from '@/lib/types/product';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Home' });
  const pageTitle = t('title');
  const pageDescription = t('description');

  const images = [
    {
      url: absoluteUrl('/og.png'),
      width: 1200,
      height: 630,
      alt: pageTitle,
    },
  ];

  // Generate alternate language URLs
  const alternates = routing.locales.reduce((acc: Record<string, string>, lang: string) => {
    if (lang !== locale) {
      acc[lang] = buildCanonicalUrl('', lang);
    }
    return acc;
  }, {} as Record<string, string>);

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      'ecommerce', 'online store', 'shopping', 'next.js', 'react',
      ...(siteConfig.keywords || [])
    ].join(', '),
    alternates: {
      canonical: buildCanonicalUrl('', locale),
      languages: {
        'x-default': buildCanonicalUrl('', 'en'),
        ...alternates
      },
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: 'website',
      url: absoluteUrl(`/${locale}`),
      siteName: siteConfig.name,
      locale,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: images.map(img => img.url),
      creator: siteConfig.links.twitter,
      site: siteConfig.links.twitter,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    metadataBase: new URL(siteConfig.url),
    applicationName: siteConfig.name,
    authors: [
      { name: siteConfig.name, url: siteConfig.url },
    ],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
}

// Generate structured data for the homepage
function generateStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

// Generate product structured data
function generateProductStructuredData(products: Product[], locale: string) {
  if (!products.length) return null;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.title,
        description: product.description,
        image: product.image,
        url: buildCanonicalUrl(`/products/${product.id}`, locale),
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  };
}

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const [tHome, products] = await Promise.all([
    getTranslations('Home'),
    getProducts(4), // Limit to 5 products for structured data
  ]);

  const productStructuredData = generateProductStructuredData(products, locale);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Structured Data for Website */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData())
        }}
      />
      
      {/* Structured Data for Products */}
      {productStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productStructuredData)
          }}
        />
      )}
      
      <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8">
        <div className="w-full max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">{tHome('welcome')}</h1>
          <ProductsSection />
          <FeaturesSection />
        </div>
      </main>
    </div>
  );
}
