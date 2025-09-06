'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { Button } from '../ui/button';
import { ShoppingCart, Star } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group relative bg-card text-card-foreground rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border hover:border-primary/20 dark:hover:border-primary/30">
      {/* Sale Badge */}
      {product.price > 100 && (
        <div className="absolute top-3 right-3 z-10 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full">
          SALE
        </div>
      )}

      {/* Product Image */}
      <div className="relative aspect-square bg-muted/30">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          priority={false}
        />
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {product.category}
        </div>

        {/* Title */}
        <h3 className="font-semibold leading-tight line-clamp-2 h-12">
          {product.title}
        </h3>

        {/* Rating */}
        {product.rating?.rate !== undefined && (
          <div className="flex items-center gap-1">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < Math.round(product.rating?.rate || 0) ? 'fill-current' : 'text-muted-foreground/30'}`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-1">
              ({product.rating?.count || 0})
            </span>
          </div>
        )}

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="text-xl font-bold">
              ${product.price.toFixed(2)}
            </span>
            {product.price > 100 && (
              <span className="ml-2 text-sm line-through text-muted-foreground">
                ${(product.price * 1.2).toFixed(2)}
              </span>
            )}
          </div>
          <Button size="sm" variant="outline" className="rounded-full h-9 w-9 p-0">
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">Add to cart</span>
          </Button>
        </div>

        {/* Quick View */}
        <Button asChild variant="outline" className="w-full mt-2">
          <Link href={`/products/${product.id}`} className="group/button">
            <span className="group-hover/button:translate-x-1 transition-transform">
              Quick View
            </span>
          </Link>
        </Button>
      </div>
    </article>
  );
}
