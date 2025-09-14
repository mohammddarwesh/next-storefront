'use client';

import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useFilterState } from '@/hooks/useFilterState';
import { useTranslations } from 'next-intl';

export default function SearchFilter() {
  const t = useTranslations('Products');
  const { currentParams, updateParams } = useFilterState();
  const [value, setValue] = useState(currentParams.search);
  const debouncedValue = useDebounce(value, 350);

  useEffect(() => {
    setValue(currentParams.search);
  }, [currentParams.search]);

  useEffect(() => {
    updateParams({ search: debouncedValue });
  }, [debouncedValue, updateParams]);

  return (
    <div className="w-full">
      <label htmlFor="products-search" className="block text-sm font-medium mb-1">
        {t('search')}
      </label>
      <input
        id="products-search"
        type="text"
        className="w-full p-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
        placeholder={t('searchPlaceholder')}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}