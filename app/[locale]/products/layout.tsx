

import { Suspense } from 'react';
import { getCategories } from '@/lib/api/getCategories';
import CategoryNavigation from '@/components/products/CategoryNavigation';
import { getTranslations } from 'next-intl/server';

export default async function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [t, categories] = await Promise.all([
    getTranslations('Products'),
    getCategories(),
  ]);
  console.log("categories", categories);
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-2 text-center md:text-left">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          {t('title')}
        </h1>
        <p className="text-muted-foreground max-w-3xl mx-auto md:mx-0">
          {t('description')}
        </p>
      </div>

      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pb-4">
        <Suspense fallback={
          <div className="h-16 w-full animate-pulse rounded-md bg-muted" />
        }>
          <CategoryNavigation categories={categories} />
        </Suspense>
      </div>

      <main className="space-y-8">
        {children}
      </main>
    </div>
  );
}
