'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { ChangeEvent } from 'react';

export function ProductFilters() {
  const t = useTranslations('Products');
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFilterChange('search', e.target.value);
  };

  const handleCategoryChange = (value: string) => {
    handleFilterChange('category', value);
  };

  const handleSortChange = (value: string) => {
    handleFilterChange('sort', value);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">
            {t('search')}
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-md bg-background"
            placeholder={t('searchPlaceholder') || 'Search products...'}
            defaultValue={searchParams?.get('search') || ''}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="w-full md:w-48">
          <label className="block text-sm font-medium mb-1">
            {t('categories')}
          </label>
          <select
            className="w-full p-2 border rounded-md bg-background"
            defaultValue={searchParams?.get('category') || ''}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="">{t('allCategories') || 'All Categories'}</option>
            <option value="electronics">{t('electronics') || 'Electronics'}</option>
            <option value="jewelry">{t('jewelry') || 'Jewelry'}</option>
            <option value="men's clothing">{t('mensClothing') || "Men's Clothing"}</option>
            <option value="women's clothing">{t('womensClothing') || "Women's Clothing"}</option>
          </select>
        </div>

        <div className="w-full md:w-48">
          <label className="block text-sm font-medium mb-1">
            {t('sortBy')}
          </label>
          <select
            className="w-full p-2 border rounded-md bg-background"
            defaultValue={searchParams?.get('sort') || 'default'}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="default">{t('sortDefault') || 'Default'}</option>
            <option value="price_asc">{t('priceLowToHigh') || 'Price: Low to High'}</option>
            <option value="price_desc">{t('priceHighToLow') || 'Price: High to Low'}</option>
            <option value="name_asc">{t('nameAtoZ') || 'Name: A to Z'}</option>
            <option value="name_desc">{t('nameZtoA') || 'Name: Z to A'}</option>
          </select>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {t('showingXofY', { count: 0, total: 0 })}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            router.push('/products');
            router.refresh();
          }}
        >
          {t('resetFilters')}
        </Button>
      </div>
    </div>
  );
}
