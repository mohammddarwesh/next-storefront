'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import MainNav from '@/components/MainNav';

export default function Home() {
  const tCommon = useTranslations('Common');
  const t = useTranslations('Navigation');

  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-4xl font-bold mb-6">
          {tCommon('welcome', { name: 'Next Storefront' })}
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
          {tCommon('description')}
        </p>
        
        <div className="flex gap-4">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {t('browseProducts')}
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {t('learnMore')}
          </Link>
        </div>
      </main>
    </div>
  );
}
