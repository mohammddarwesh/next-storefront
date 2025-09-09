'use client';

import { Product } from '@/lib/types';
import ProductCard from './ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useCallback, useMemo, useTransition } from 'react';
import { useTranslations } from 'next-intl';

interface ProductsGridProps {
  products: Product[];
  total?: number;
  currentPage?: number;
  itemsPerPage?: number;
  title?: string;
  description?: string;
  className?: string;
  isLoading?: boolean;
  skeletonCount?: number;
  showPagination?: boolean;
}

export function ProductCardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-64 w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex justify-between pt-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}

export default function ProductsGrid({
  products,
  total = 0,
  currentPage = 1,
  itemsPerPage = 12,
  title,
  description,
  className = '',
  isLoading = false,
  skeletonCount = 8,
  showPagination = true
}: ProductsGridProps) {
  const t = useTranslations('Common');
  const router = useRouter();
  const pathname = usePathname();
  const searchParamsObj = useSearchParams();
  const [, startTransition] = useTransition();

  const totalPages = Math.max(1, Math.ceil(total / itemsPerPage));
  const current = Math.min(Math.max(1, currentPage), totalPages);

  const handlePageChange = useCallback((page: number) => {
    const params = new URLSearchParams(searchParamsObj.toString());
    params.set('page', page.toString());
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }, [pathname, router, searchParamsObj]);

  const pageNumbers = useMemo(() => {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, current - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) pages.push(i);
    return pages;
  }, [current, totalPages]);

  if (isLoading) {
    return (
      <div className={className}>
        {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
        {description && <p className="text-muted-foreground mb-6">{description}</p>}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">{t('noProducts')}</h3>
        <p className="text-muted-foreground mt-2">{t('noProductsDescription')}</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="mb-6">
        {title && <h2 className="text-2xl font-bold">{title}</h2>}
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 mb-8 items-center justify-center">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {showPagination && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
          <div className="text-sm text-muted-foreground">
            Showing {((current - 1) * itemsPerPage) + 1} to {Math.min(current * itemsPerPage, total)} of {total} products
          </div>
          <nav className="flex items-center gap-1" aria-label="Pagination">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(current - 1)}
              disabled={current <= 1}
              className="px-2 h-9"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="hidden xs:flex items-center gap-1">
              {pageNumbers.map((page) => (
                <Button
                  key={page}
                  variant={page === current ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className="min-w-[36px] h-9"
                >
                  {page}
                </Button>
              ))}
            </div>
            
            <div className="xs:hidden flex items-center gap-2 px-3">
              <span className="text-sm font-medium">{current}</span>
              <span className="text-sm text-muted-foreground">of</span>
              <span className="text-sm font-medium">{totalPages}</span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(current + 1)}
              disabled={current >= totalPages}
              className="px-2 h-9"
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </nav>
        </div>
      )}
    </div>
  );
}
