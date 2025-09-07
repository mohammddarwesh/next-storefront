import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getProducts } from '@/lib/api/getProducts';
import ProductsGrid from '@/components/products/ProductsGrid';
import { SearchParams } from '@/lib/types/index';

export const revalidate = 3600; // Revalidate at most every hour

interface ProductsPageProps {
  params: { locale: string };
  searchParams?: SearchParams;
}

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Products' });
  
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
    },
  };
}

export default async function ProductsPage({ 
  params: { locale },
  searchParams = {} 
}: ProductsPageProps) {
  const [t, products] = await Promise.all([
    getTranslations('Products'),
    getProducts()
  ]);

  // Apply search filter if search param exists
  const filteredProducts = searchParams?.search
    ? products.filter(product => 
        product.title.toLowerCase().includes(searchParams.search?.toLowerCase() || '') ||
        product.description.toLowerCase().includes(searchParams.search?.toLowerCase() || '')
      )
    : products;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
          <section className="space-y-6">
          <ProductsGrid 
            products={filteredProducts}
            title={t('allProducts')}
            description={t('browseAllProducts')}
            searchParams={searchParams}
            showPagination={true}
          />
        </section>
      </div>
    </div>
  );
}
