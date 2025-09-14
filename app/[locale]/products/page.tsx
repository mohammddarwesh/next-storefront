import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getProducts } from '@/lib/api/getProducts';
import ProductsGrid from '@/components/products/ProductsGrid';
import { getCategories } from '@/lib/api/getCategories';
import FilterControls from '@/components/filters/FilterControls';
import { applyFiltersSortPaginate } from '@/lib/features/filters/utils';
import { parseFilterParams } from '@/lib/features/filters/urlParams';
import { siteConfig } from '@/lib/config';
import { absoluteUrl } from '@/lib/utils/url';

export const revalidate = 3600;

interface ProductsPageProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}): Promise<Metadata> {
  const t = await getTranslations('Products');

  const getStr = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v || '');
  const category = getStr(searchParams?.category);

  const baseTitle = t('title');
  const pageTitle = category ? `${decodeURIComponent(category)} - ${baseTitle}` : baseTitle;
  const pageDescription = t('description');

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: 'website',
      url: absoluteUrl(`/products?category=${category}`),
      images: [
        {
          url: absoluteUrl('/og.png'),
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [absoluteUrl('/og.png')],
      creator: siteConfig.links.twitter,
    },
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const [t, products, categories] = await Promise.all([
    getTranslations('Products'),
    getProducts(),
    getCategories()
  ]);

  const filterParams = parseFilterParams(searchParams);
  const { items, total, currentPage } = applyFiltersSortPaginate(products, filterParams);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <aside className="md:col-span-4 lg:col-span-3">
          <div className="md:sticky md:top-24">
            <div className="hidden md:block">
              <FilterControls categories={categories} variant="sidebar"/>
            </div>
            <div className="md:hidden">
              <FilterControls variant="toolbar" categories={categories} />
            </div>
          </div>
        </aside>

        <section className="md:col-span-8 lg:col-span-9 space-y-6">
          <ProductsGrid 
            products={items}
            total={total}
            currentPage={currentPage}
            itemsPerPage={filterParams.limit}
            title={t('allProducts')}
            description={t('browseAllProducts')}
            showPagination={true}
          />
        </section>
      </div>
    </div>
  );
}