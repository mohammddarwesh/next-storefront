'use client';

import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types/product';
import { Button } from '../ui/button';
import { Star } from 'lucide-react';
import AddToCartButton from '../cart/AddToCartButton';

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group relative bg-card text-card-foreground rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border hover:border-primary/20 dark:hover:border-primary/30 h-full flex flex-col">
      {/* Sale Badge */}
      {product.price > 100 && (
        <div className="absolute top-2 right-2 z-10 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full">
          SALE
        </div>
      )}

      {/* Product Image */}
      <div className="relative aspect-square bg-muted/30 overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          priority={false}
        />
      </div>

      {/* Product Info */}
      <div className="p-3 sm:p-4 space-y-2 sm:space-y-3 flex-1 flex flex-col">
        {/* Category */}
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {product.category}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-sm sm:text-base leading-tight line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
          {product.title}
        </h3>

        {/* Rating */}
        {product.rating?.rate !== undefined && (
          <div className="flex items-center gap-1">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 sm:h-4 sm:w-4 ${i < Math.round(product.rating?.rate || 0) ? 'fill-current' : 'text-muted-foreground/30'}`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-1">
              ({product.rating?.count || 0})
            </span>
          </div>
        )}

        {/* Spacer to push price/CTA to bottom */}
        <div className="flex-1"></div>

        {/* Price & CTA */}
        <div className="space-y-2 mt-auto">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold">
                ${product.price.toFixed(2)}
              </span>
              {product.price > 100 && (
                <span className="text-xs sm:text-sm line-through text-muted-foreground">
                  ${(product.price * 1.2).toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Mobile: Stack buttons vertically */}
          <div className="flex flex-col gap-2 ">
            <AddToCartButton product={product} className="w-full" />
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link href={`/product/${product.id}`} aria-label={`View details for ${product.title}`}>
                Quick View
              </Link>
            </Button>
          </div>

        
        </div>
      </div>
    </article>
  );
}

export default memo(ProductCard);
