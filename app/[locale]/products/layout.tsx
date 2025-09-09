

import { getCategories } from '@/lib/api/getCategories';
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
      <main className="space-y-8" role="main">
        {children}
      </main>
    </div>
  );
}
