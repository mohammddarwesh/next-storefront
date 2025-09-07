import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ProductsSection from '@/components/home/ProductsSection';
import FeaturesSection from '@/components/home/FeaturesSection';

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'Home' });
  
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
  const [tCommon, tHome] = await Promise.all([
    getTranslations('Common'),
    getTranslations('Home')
  ]);

  // Fetch featured products with error boundary

  return (
    <div className="min-h-screen flex flex-col">
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
