'use client';

import { useFilterState } from '@/hooks/useFilterState';
import SearchFilter from '@/components/filters/SearchFilter';
import SortDropdown from './SortDropdown';
import PriceRangeFilter from '@/components/filters/PriceRangeFilter';
import CategoryFilter from '@/components/filters/CategoryFilter';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { CategoryOption } from '@/lib/types/filters';

interface FilterControlsProps {
  categories: CategoryOption[];
  variant?: 'sidebar' | 'toolbar';
}

export default function FilterControls({ categories, variant = 'sidebar' }: FilterControlsProps) {
  const t = useTranslations('Products');
  const { activeFilterCount, resetFilters } = useFilterState();

  if (variant === 'sidebar') {
    return (
      <section aria-label="Product filters" className="rounded-xl border bg-card text-card-foreground p-4 space-y-4 shadow-sm">
        <SearchFilter />
        <CategoryFilter categories={categories} />
        <PriceRangeFilter />
        <SortDropdown />
        <Button
          aria-label="Reset all filters"
          variant="outline"
          className="w-full"
          onClick={resetFilters}
        >
          {t('resetFilters')}
        </Button>
      </section>
    );
  }

  return ( 
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          {t("filters")}
          {activeFilterCount > 0 && (
            <span className="ml-2 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs px-2 py-0.5">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="fixed bottom-0 right-0 w-full max-h-[80vh] overflow-y-auto rounded-t-2xl border-t bg-background p-4 sm:max-w-md sm:rounded-lg sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2">
        <DialogHeader>
          <DialogTitle>{t("filters")}</DialogTitle>
        </DialogHeader>
        <SearchFilter />
        <div className="space-y-4">
          <CategoryFilter categories={categories} />
          <PriceRangeFilter />
          <SortDropdown />
          <Button
            variant="outline"
            className="w-full"
            onClick={resetFilters}
          >
            {t("resetFilters")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}