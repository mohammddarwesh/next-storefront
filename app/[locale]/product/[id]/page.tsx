import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getProductById } from '@/lib/api/getProductById';
import { getBaseUrl, buildCanonicalUrl } from '@/lib/utils/url';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import Script from 'next/script';
import { Metadata } from 'next';
import { ProductActions } from '@/components/product/ProductActions';

export async function generateMetadata({
  params: { id, locale },
}: {
  params: { id: string; locale: string };
}): Promise<Metadata> {
  try {
    const product = await getProductById(id);
    if (!product) notFound();

    const title = `${product.title} | Next Storefront`;
    const description = product.description.substring(0, 160);
    const canonicalUrl = await buildCanonicalUrl(`/product/${id}`, locale);
    
    return {
      title,
      description,
      metadataBase: new URL(await getBaseUrl()),
      alternates: {
        canonical: canonicalUrl,
        languages: {
          'en': `${await getBaseUrl()}/en/product/${id}`,
          'tr': `${await getBaseUrl()}/tr/urun/${id}`,
        },
      },
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        siteName: 'Next Storefront',
        images: [{
          url: new URL(product.image, await getBaseUrl()).toString(),
          width: 1200,
          height: 630,
          alt: product.title,
        }],
        locale,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [product.image],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Error',
      description: 'An error occurred while loading the product.',
      robots: {
        index: false,
      },
    };
  }
}

export default async function ProductPage({
  params: { id, locale },
}: {
  params: { id: string; locale: string };
}) {
  const [t, product] = await Promise.all([
    getTranslations('Product'),
    getProductById(id),
  ]);

  const rating = product.rating ? Math.round(product.rating.rate) : 0;
  const stars = Array(5).fill(0).map((_, i) => i < rating);

  // Generate structured data for rich snippets
  const structuredData = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.title,
    image: product.image,
    description: product.description.substring(0, 160),
    sku: `PROD-${product.id}`,
    brand: {
      '@type': 'Brand',
      name: 'Next Store',
    },
    offers: {
      '@type': 'Offer',
      url: `${getBaseUrl()}/${locale}/product/${id}`,
      priceCurrency: locale === 'tr' ? 'TRY' : 'USD',
      price: product.price,
      priceValidUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString().split('T')[0],
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
    },
    ...(product.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating.rate,
        reviewCount: product.rating.count,
        bestRating: '5',
        worstRating: '1',
      }
    }),
  };

  return (
    <>
      <Script
        id="product-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-8"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {/* Placeholder for additional product images */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square rounded-md bg-gray-100">
                <Image
                  src={product.image}
                  alt={`${product.title} - ${i}`}
                  width={100}
                  height={100}
                  className="h-full w-full object-contain p-2"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{product.title}</h1>
            <div className="mt-2 flex items-center">
              {product.rating && (
                <>
                  <div className="flex">
                    {stars.map((filled, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${filled ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating.rate} ({product.rating.count} reviews)
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>
            <p className="text-gray-700 dark:text-gray-300">{product.description}</p>

            <div className="flex items-center space-x-4 pt-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Category:</span>
                <span className="text-sm font-medium">{product.category}</span>
              </div>
              <span className="h-4 w-px bg-gray-300"></span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Availability:</span>
                <span className="text-sm font-medium text-green-600">In Stock</span>
              </div>
            </div>
          </div>

          <ProductActions product={product} />
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button className="border-b-2 border-primary-500 py-4 px-1 text-sm font-medium text-primary-600">
              Description
            </button>
            <button className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
              Reviews ({product.rating?.count || 0})
            </button>
          </nav>
        </div>
        <div className="py-6">
          <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
        </div>
      </div>
      </div>
    </>
  );
}
