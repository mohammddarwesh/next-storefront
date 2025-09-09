"use client";

import { useEffect, useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SortOrder } from '@/lib/features/filters/filtersSlice';
import { useTranslations } from 'next-intl';
import { useFilters } from '@/hooks/useFilters';

export default function SortDropdown() {
  const t = useTranslations('Products');
  const { sort: sortState, setSort } = useFilters();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState<SortOrder>((searchParams.get('sort') as SortOrder) || sortState || 'default');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setSort(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'default') {
      params.set('sort', value);
    } else {
      params.delete('sort');
    }
    params.set('page', '1');
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, setSort]);

  return (
    <div className="w-full">
      <label htmlFor="products-sort" className="block text-sm font-medium mb-1">{t('sortBy') || 'Sort by'}</label>
      <select
        id="products-sort"
        aria-label="Sort products"
        className="w-full p-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
        value={value}
        onChange={(e) => setValue(e.target.value as SortOrder)}
      >
        <option value="default">{t('sortDefault') || 'Default'}</option>
        <option value="price_asc">{t('priceLowToHigh') || 'Price: Low to High'}</option>
        <option value="price_desc">{t('priceHighToLow') || 'Price: High to Low'}</option>
      </select>
      {isPending && (
        <div aria-live="polite" className="mt-1 text-xs text-muted-foreground">Updating…</div>
      )}
    </div>
  );
}
