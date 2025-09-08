'use client';

import Image from 'next/image';
import { Minus, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils/format';
import { CartItem } from '@/lib/types/cart';

interface CartItemRowProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { updateCartItemQuantity, removeFromCart } = useCart();
  const { id, title, price, quantity, image } = item;

  return (
    <div className="flex items-start space-x-4 py-4">
      <div className="relative h-16 w-16 overflow-hidden rounded-md border">
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center"
          />
        )}
      </div>
      
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-medium line-clamp-2">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{formatPrice(price)}</p>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 -mr-2"
            onClick={() => removeFromCart(id)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Remove</span>
          </Button>
        </div>
        
        <div className="mt-2 flex items-center">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-r-none"
              onClick={() => updateCartItemQuantity(id, Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            
            <span className="w-8 text-center text-sm">{quantity}</span>
            
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-l-none"
              onClick={() => updateCartItemQuantity(id, quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="ml-auto font-medium">
            {formatPrice(price * quantity)}
          </div>
        </div>
      </div>
    </div>
  );
}
