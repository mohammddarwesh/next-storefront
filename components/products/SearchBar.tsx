"use client";

import { useEffect, useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';
import { useTranslations } from 'next-intl';
import { useFilters } from '@/hooks/useFilters';

export default function SearchBar({ placeholder }: { placeholder?: string }) {
  const t = useTranslations('Products');
  const { search: searchState, setSearch } = useFilters();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get('search') ?? searchState ?? '');
  const debounced = useDebounce(value, 350);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setSearch(value);
  }, [value, setSearch]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debounced && debounced.trim().length > 0) {
      params.set('search', debounced.trim());
      params.set('page', '1');
    } else {
      params.delete('search');
      params.set('page', '1');
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  return (
    <div className="w-full">
      <label htmlFor="products-search" className="block text-sm font-medium mb-1">{t('search') || 'Search'}</label>
      <input
        id="products-search"
        aria-label="Search products"
        type="text"
        className="w-full p-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
        placeholder={placeholder || t('searchPlaceholder') || 'Search products...'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {isPending && (
        <div aria-live="polite" className="mt-1 text-xs text-muted-foreground">Updating…</div>
      )}
    </div>
  );
}
