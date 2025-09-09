"use client";

import { useEffect, useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useFilters } from '@/hooks/useFilters';

export default function PriceRangeFilter() {
  const t = useTranslations('Products');
  const { minPrice: minPriceState, maxPrice: maxPriceState, setMinPrice, setMaxPrice } = useFilters();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [min, setMin] = useState<string>(searchParams.get('minPrice') ?? (minPriceState?.toString() ?? ''));
  const [max, setMax] = useState<string>(searchParams.get('maxPrice') ?? (maxPriceState?.toString() ?? ''));

  useEffect(() => {
    const minNum = min === '' ? null : Number(min);
    const maxNum = max === '' ? null : Number(max);
    setMinPrice(Number.isFinite(minNum as number) ? (minNum as number) : null);
    setMaxPrice(Number.isFinite(maxNum as number) ? (maxNum as number) : null);

    const params = new URLSearchParams(searchParams.toString());
    if (min && !isNaN(Number(min))) params.set('minPrice', String(Math.max(0, Math.floor(Number(min)))));
    else params.delete('minPrice');

    if (max && !isNaN(Number(max))) params.set('maxPrice', String(Math.max(0, Math.floor(Number(max)))));
    else params.delete('maxPrice');

    params.set('page', '1');
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [min, max]);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-1">{t('priceRange') || 'Price range'}</label>
      <div className="flex items-center gap-2">
        <input
          aria-label={t('minPrice') || 'Minimum price'}
          type="number"
          min={0}
          className="w-full p-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
          placeholder={t('min') || 'Min'}
          value={min}
          onChange={(e) => setMin(e.target.value)}
        />
        <span className="text-muted-foreground">-</span>
        <input
          aria-label={t('maxPrice') || 'Maximum price'}
          type="number"
          min={0}
          className="w-full p-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
          placeholder={t('max') || 'Max'}
          value={max}
          onChange={(e) => setMax(e.target.value)}
        />
      </div>
      {isPending && (
        <div aria-live="polite" className="mt-1 text-xs text-muted-foreground">Updating…</div>
      )}
    </div>
  );
}
