"use client";

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import SearchBar from './SearchBar';
import SortDropdown from './SortDropdown';
import PriceRangeFilter from './PriceRangeFilter';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { useFilters } from '@/hooks/useFilters';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

interface CategoryOption {
  id: string;
  name: string;
  slug: string;
}

export default function FilterControls({ categories, variant = 'sidebar' }: { categories: CategoryOption[]; variant?: 'sidebar' | 'toolbar' }) {
  const t = useTranslations('Products');
  const { category: categoryState, search, minPrice, maxPrice, sort, setCategory, resetFilters } = useFilters();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [category, setCategoryLocal] = useState<string>(searchParams.get('category') ?? categoryState ?? '');

  const activeCount = useMemo(() => {
    let c = 0;
    if (search && search.trim().length) c++;
    if (category && category.length) c++;
    if (typeof minPrice === 'number') c++;
    if (typeof maxPrice === 'number') c++;
    if (sort && sort !== 'default') c++;
    return c;
  }, [search, category, minPrice, maxPrice, sort]);

  useEffect(() => {
    setCategory(category);
    const params = new URLSearchParams(searchParams.toString());
    if (category && category.length > 0) params.set('category', category);
    else params.delete('category');
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, setCategory]);

  // Sidebar variant: stacked vertical controls
  if (variant === 'sidebar') {
    return (
      <section aria-label="Product filters" className="rounded-xl border bg-card text-card-foreground p-4 space-y-4 shadow-sm">
        <SearchBar />
        <div>
          <label htmlFor="products-category" className="block text-sm font-medium mb-1">{t('categories') || 'Category'}</label>
          <select
            id="products-category"
            aria-label="Filter by category"
            className="w-full p-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
            value={category}
            onChange={(e) => setCategoryLocal(e.target.value)}
          >
            <option value="">{t('allCategories') || 'All categories'}</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>
        <PriceRangeFilter />
        <SortDropdown />
        <Button
          aria-label="Reset all filters"
          variant="outline"
          className="w-full"
          onClick={() => {
            resetFilters();
            const base = new URLSearchParams(searchParams.toString());
            base.delete('search');
            base.delete('category');
            base.delete('minPrice');
            base.delete('maxPrice');
            base.delete('sort');
            base.set('page', '1');
            router.replace(`${pathname}?${base.toString()}`, { scroll: false });
            setCategoryLocal('');
          }}
        >
          {t('resetFilters') || 'Reset'}
        </Button>
      </section>
    );
  }

  // Toolbar variant (previous responsive header style)
  return (
    <Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">
      {t("filters")}
      {activeCount > 0 && (
        <span className="ml-2 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs px-2 py-0.5">
          {activeCount}
        </span>
      )}
    </Button>
  </DialogTrigger>
  <DialogContent
    className="fixed bottom-0 left-0 right-0 w-full max-h-[80vh] overflow-y-auto rounded-t-2xl border-t bg-background p-4 sm:max-w-md sm:rounded-lg sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2"
  >
    <DialogHeader>
      <DialogTitle>{t("filters")}</DialogTitle>
    </DialogHeader>
    <div className="space-y-4">
      <div>
        <label
          htmlFor="products-category-m"
          className="block text-sm font-medium mb-1"
        >
          {t("categories") || "Category"}
        </label>
        <select
          id="products-category-m"
          className="w-full p-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
          value={category}
          onChange={(e) => setCategoryLocal(e.target.value)}
        >
          <option value="">{t("allCategories") || "All categories"}</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <PriceRangeFilter />
      <SortDropdown />
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          resetFilters();
          const base = new URLSearchParams(searchParams.toString());
          ["search", "category", "minPrice", "maxPrice", "sort"].forEach((p) =>
            base.delete(p)
          );
          base.set("page", "1");
          router.replace(`${pathname}?${base.toString()}`, { scroll: false });
          setCategoryLocal("");
        }}
      >
        {t("resetFilters") || "Reset"}
      </Button>
    </div>
  </DialogContent>
</Dialog>

  );
}
