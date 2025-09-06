'use client';

import { Product } from '@/types/product';
import ProductCard from './ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

type ProductsGridProps = {
  products: Product[];
  title?: string;
  description?: string;
  className?: string;
  showViewAll?: boolean;
  viewAllHref?: string;
  isLoading?: boolean;
  skeletonCount?: number;
};

export function ProductCardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-64 w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex justify-between pt-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
        <Skeleton className="h-10 w-full mt-2" />
      </div>
    </div>
  );
}

export default function ProductsGrid({
  products,
  title,
  description,
  className = '',
  showViewAll = false,
  viewAllHref = '/products',
  isLoading = false,
  skeletonCount = 8,
}: ProductsGridProps) {
  if (isLoading) {
    return (
      <section className={className}>
        {(title || description) && (
          <div className="text-center mb-8">
            {title && <Skeleton className="h-8 w-64 mx-auto mb-2" />}
            {description && <Skeleton className="h-5 w-96 max-w-full mx-auto" />}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (!products.length) {
    return (
      <section className={`text-center py-16 ${className}`}>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-muted-foreground">
            No products found
          </h3>
          <p className="text-muted-foreground/80">
            We couldn't find any products matching your criteria.
          </p>
          <Button asChild variant="outline" className="mt-4">
            <Link href="/products">Browse all products</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className={className}>
      {(title || description) && (
        <div className="text-center mb-12">
          {title && (
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {showViewAll && (
        <div className="mt-12 text-center">
          <Button asChild variant="outline" className="group">
            <Link href={viewAllHref}>
              View all products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      )}
    </section>
  );
}
