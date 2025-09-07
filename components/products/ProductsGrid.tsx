'use client';

import { Product } from '@/lib/types';
import ProductCard from './ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';

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
  searchParams?: Record<string, string | string[] | undefined>;
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
  searchParams = {},
  showPagination = true
}: ProductsGridProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParamsObj = useSearchParams();

  const totalPages = Math.max(1, Math.ceil(total / itemsPerPage));
  const current = Math.min(Math.max(1, currentPage), totalPages);

  const handlePageChange = useCallback((page: number) => {
    const params = new URLSearchParams(searchParamsObj.toString());
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
  }, [pathname, router, searchParamsObj]);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, current - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (isLoading) {
    return (
      <div className={className}>
        {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
        {description && <p className="text-muted-foreground mb-6">{description}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
        <h3 className="text-lg font-medium">No products found</h3>
        <p className="text-muted-foreground mt-2">
          Try adjusting your search or filter to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="mb-6">
        {title && <h2 className="text-2xl font-bold">{title}</h2>}
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {showPagination && totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="flex items-center gap-1" aria-label="Pagination">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(current - 1)}
              disabled={current <= 1}
              className="px-2"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            {getPageNumbers().map((page) => (
              <Button
                key={page}
                variant={page === current ? 'default' : 'outline'}
                size="sm"
                onClick={() => handlePageChange(page)}
                className="min-w-[40px]"
              >
                {page}
              </Button>
            ))}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(current + 1)}
              disabled={current >= totalPages}
              className="px-2"
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
