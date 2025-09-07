import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { getCategories } from '@/lib/api/getCategories';
import { getProductsByCategory } from '@/lib/api/getProductsByCategory';
import ProductsGrid from '@/components/products/ProductsGrid';
import { getBaseUrl } from '@/lib/utils/url';

interface CategoryPageProps {
  params: {
    locale: string;
    slug: string;
  };
  searchParams: {
    page?: string;
    sort?: string;
    search?: string;
  };
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.flatMap(category => [
    { slug: category.slug, locale: 'en' },
    { slug: category.slug, locale: 'tr' }
  ]);
}

export async function generateMetadata({
  params
}: CategoryPageProps): Promise<Metadata> {
  const { locale, slug } = params;
  const [t, categories] = await Promise.all([
    getTranslations('Category'),
    getCategories()
  ]);
  
  const category = categories.find(c => c.slug === slug);
  if (!category) {
    return {
      title: t('notFound')
    };
  }

  const title = t('pageTitle', { category: category.name });
  const description = t('description', { category: category.name });
  const baseUrl = getBaseUrl();
  const canonical = `${baseUrl}/${locale}/products/category/${slug}`;
  
  const enUrl = locale === 'en' 
    ? canonical 
    : `${baseUrl}/en/products/category/${slug}`;
  
  const trUrl = locale === 'tr' 
    ? canonical 
    : `${baseUrl}/tr/urunler/kategori/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: enUrl,
        tr: trUrl,
      },
    },
    openGraph: {
      title,
      description,
      locale,
      type: 'website',
      url: canonical,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams
}: CategoryPageProps) {
  const { locale, slug } = params;
  const [t, categories] = await Promise.all([
    getTranslations('Category'),
    getCategories()
  ]);
  
  const category = categories.find(c => c.slug === slug);
  if (!category) {
    notFound();
  }

  // Parse search params safely
  const page = searchParams?.page ? parseInt(searchParams.page, 10) : 1;
  const sort = searchParams?.sort || 'latest';
  const search = searchParams?.search || '';
console.log("category from params", category);
  const { products, total } = await getProductsByCategory({
    category: slug,
    page,
    sort,
    search,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
      <p className="text-muted-foreground mb-8">
        {t('showingResults', { count: total })}
      </p>
      
      <ProductsGrid
        products={products}
        total={total}
        currentPage={page}
        title={category.name}
        description={category.description}
        searchParams={searchParams}
      />
    </div>
  );
}