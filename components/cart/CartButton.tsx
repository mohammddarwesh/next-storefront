'use client';

import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';

interface CartButtonProps {
  onClick?: () => void;
}

export function CartButton({ onClick }: CartButtonProps) {
  const { totalQuantity } = useCart();

  return (
    <Button 
      variant="outline" 
      size="icon" 
      className="relative"
      aria-label="Open cart"
      onClick={onClick}
    >
      <ShoppingCart className="h-4 w-4" />
      {totalQuantity > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
          {totalQuantity}
        </span>
      )}
    </Button>
  );
}
