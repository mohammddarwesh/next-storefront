'use client';

import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useFilterState } from '@/hooks/useFilterState';
import { useTranslations } from 'next-intl';

export default function PriceRangeFilter() {
  const t = useTranslations('Products');
  const { currentParams, updateParams } = useFilterState();
  
  const [min, setMin] = useState(currentParams.minPrice?.toString() ?? '');
  const [max, setMax] = useState(currentParams.maxPrice?.toString() ?? '');
  
  const debouncedMin = useDebounce(min, 350);
  const debouncedMax = useDebounce(max, 350);

  useEffect(() => {
    setMin(currentParams.minPrice?.toString() ?? '');
    setMax(currentParams.maxPrice?.toString() ?? '');
  }, [currentParams.minPrice, currentParams.maxPrice]);

  useEffect(() => {
    updateParams({
      minPrice: debouncedMin ? parseInt(debouncedMin) : null,
      maxPrice: debouncedMax ? parseInt(debouncedMax) : null,
    });
  }, [debouncedMin, debouncedMax, updateParams]);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-1">{t('priceRange')}</label>
      <div className="flex items-center gap-2">
        <input
          aria-label={t('minPrice')}
          type="number"
          min={0}
          className="w-full p-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
          placeholder={t('min')}
          value={min}
          onChange={(e) => setMin(e.target.value)}
        />
        <span className="text-muted-foreground">-</span>
        <input
          aria-label={t('maxPrice')}
          type="number"
          min={0}
          className="w-full p-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
          placeholder={t('max')}
          value={max}
          onChange={(e) => setMax(e.target.value)}
        />
      </div>
    </div>
  );
}