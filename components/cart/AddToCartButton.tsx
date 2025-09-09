'use client';

import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useCart } from '@/hooks/useCart';
import type { AddToCartPayload } from '@/lib/types/cart';

interface AddToCartButtonProps {
  product: AddToCartPayload;
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

export default function AddToCartButton({
  product,
  variant = 'default',
  size = 'default',
  className = '',
}: AddToCartButtonProps) {
  const t = useTranslations('ProductCard');
  const { addToCart, isInCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const isProductInCart = isInCart(product.id);

  const handleAddToCart = () => {
    try {
      setIsLoading(true);
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      });
      toast.success(t('addedToCart'));
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      toast.error(t('addToCartError'));
    } finally {
      setIsLoading(false);
    }
  };

  if (isProductInCart) {
    return (
      <Button
        variant="outline"
        size={size}
        className={`${className} bg-green-50 hover:bg-green-100 text-green-700 min-w-0 flex-shrink-0`}
      >
        <span className="truncate">{t('addedToCart')}</span>
      </Button>
    );
  }

  return (
    <Button
      onClick={handleAddToCart}
      variant={variant}
      size={size}
      className={`${className} transition-all min-w-0 flex-shrink-0 cursor-pointer`}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        <>
          <ShoppingCart className="mr-1 sm:mr-2 h-4 w-4 flex-shrink-0" />
          <span className="truncate">{t('addToCart')}</span>
        </>
      )}
    </Button>
  );
}
