'use client';

import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslations } from 'next-intl';

interface ProductActionsProps {
  product: {
    id: string;
    title: string;
    price: number;
    image: string;
  };
}

export function ProductActions({ product }: ProductActionsProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const t = useTranslations('Product');
  const cartT = useTranslations('Cart');

  const handleAddToCart = () => {
    // Add the item to cart with quantity 1, the cart will handle incrementing if item exists
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
    
    toast.success(cartT('addedToCart'), {
      position: 'bottom-right',
      duration: 2000,
    });
  };

  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center border rounded-md overflow-hidden">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-none border-0"
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
          >
            -
          </Button>
          <span className="w-10 text-center font-medium">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-none border-0"
            onClick={() => setQuantity((prev) => prev + 1)}
          >
            +
          </Button>
        </div>
      </div>

      <div className="flex space-x-4">
        <Button 
          size="lg" 
          className="flex-1"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {t('addToCart')}
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-12 w-12"
        >
          <Heart className="h-5 w-5" />
          <span className="sr-only">{t('addToWishlist')}</span>
        </Button>
      </div>
    </div>
  );
}
