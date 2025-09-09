import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getProducts } from '@/lib/api/getProducts';
import ProductsGrid from '@/components/products/ProductsGrid';
import { SearchParams } from '@/lib/types/index';
import { getCategories } from '@/lib/api/getCategories';
import FilterControls from '@/components/products/FilterControls';
import { applyFiltersSortPaginate } from '@/lib/features/filters/utils';

export const revalidate = 3600; // Revalidate at most every hour

interface ProductsPageProps {
  params: { locale: string };
  searchParams?: SearchParams;
}

import { siteConfig } from '@/lib/config';
import { absoluteUrl } from '@/lib/utils/url';

export async function generateMetadata({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams?: Record<string, string | string[] | undefined>;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Products' });

  const getStr = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v || '');
  const search = getStr(searchParams?.search);
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

export default async function ProductsPage({ 
  searchParams : searchParamsProps
}: ProductsPageProps) {
  const [t, products, categories] = await Promise.all([
    getTranslations('Products'),
    getProducts(),
    getCategories()
  ]);
  const searchParams = await searchParamsProps;
  // Parse and normalize query params
  const page = searchParams?.page ? parseInt(searchParams.page, 10) : 1;
  const limit = searchParams?.limit ? parseInt(searchParams.limit, 10) : 12;
  const sort = (searchParams?.sort as string | undefined) || 'default';
  const search = searchParams?.search || '';
  const category = searchParams?.category || '';
  const minPrice = searchParams?.minPrice ? Number(searchParams.minPrice) : null;
  const maxPrice = searchParams?.maxPrice ? Number(searchParams.maxPrice) : null;

  const { items, total, currentPage } = applyFiltersSortPaginate({
    products,
    search,
    category,
    minPrice: Number.isFinite(minPrice as number) ? (minPrice as number) : null,
    maxPrice: Number.isFinite(maxPrice as number) ? (maxPrice as number) : null,
    sort,
    page,
    limit,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <aside className="md:col-span-4 lg:col-span-3 order-2 md:order-1">
          <div className="md:sticky md:top-24">
            <FilterControls categories={categories} />
          </div>
        </aside>

        <section className="md:col-span-8 lg:col-span-9 order-1 md:order-2 space-y-6">
          <ProductsGrid 
            products={items}
            total={total}
            currentPage={currentPage}
            itemsPerPage={limit}
            title={t('allProducts')}
            description={t('browseAllProducts')}
            showPagination={true}
          />
        </section>
      </div>
    </div>
  );
}
