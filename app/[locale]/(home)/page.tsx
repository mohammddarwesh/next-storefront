import { getProducts } from '@/lib/fakeStore';
import ProductsGrid from '@/components/products/ProductsGrid';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';


export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Home' });
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const [t, tCommon] = await Promise.all([
    getTranslations('Navigation'),
    getTranslations('Common'),
  ]);

  // Fetch featured products with error boundary
  const featuredProducts = await getProducts(4);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            {tCommon('welcome', { name: 'Next Storefront' })}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {tCommon('description')}
          </p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <ProductsGrid
            products={featuredProducts}
            title={t('featuredProducts')}
            description={t('featuredProductsDescription')}
            showViewAll
            viewAllHref="/products"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M5 13l4 4L19 7"
                  />
                ),
                title: t('premiumQuality'),
                description: t('premiumQualityDescription'),
              },
              {
                icon: (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                ),
                title: t('fastDelivery'),
                description: t('fastDeliveryDescription'),
              },
              {
                icon: (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                ),
                title: t('securePayment'),
                description: t('securePaymentDescription'),
              },
            ].map((feature, index) => (
              <div 
                key={index}
                className="group bg-card text-card-foreground p-6 rounded-lg shadow-sm border border-border hover:border-primary/20 transition-colors"
              >
                <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <svg 
                    className="w-6 h-6 text-primary" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    {feature.icon}
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-center">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
