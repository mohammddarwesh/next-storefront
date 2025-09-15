'use client';

import { useFilterState } from '@/hooks/useFilterState';
import { useTranslations } from 'next-intl';
import { SortOrder } from '@/lib/types/filters';

export default function SortDropdown() {
  const t = useTranslations('Products');
  const { currentParams, updateParams } = useFilterState();

  const handleChange = (value: string) => {
    updateParams({ sort: value as SortOrder });
  };

  return (
    <div className="w-full">
      <label htmlFor="products-sort" className="block text-sm font-medium mb-1">
        {t('sortBy')}
      </label>
      <select
        id="products-sort"
        className="w-full p-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
        value={currentParams.sort}
        onChange={(e) => handleChange(e.target.value)}
      >
        <option value="default">{t('sortDefault')}</option>
        <option value="price_asc">{t('priceLowToHigh')}</option>
        <option value="price_desc">{t('priceHighToLow')}</option>
      </select>
    </div>
  );
}