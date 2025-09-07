import { getTranslations } from 'next-intl/server';
import ProductsGrid from '../products/ProductsGrid';
import { getProducts } from '@/lib/api/getProducts';

export default async function ProductsSection() {
  const t = await getTranslations('Home');
  
    const featuredProducts = await getProducts(4);

    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <ProductsGrid
            products={featuredProducts}
            title={t('featuredProducts')}
            description={t('featuredProductsDescription')}
            // showViewAll={true}
            // viewAllHref="/products"
          />
        </div>
      </section>
    );
}
