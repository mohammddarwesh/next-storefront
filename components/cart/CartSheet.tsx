'use client';

import { useTranslations } from 'next-intl';
import { ShoppingCart, X, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { CartButton } from './CartButton';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription, 
  SheetFooter,
  SheetTrigger 
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils/format';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { CartItemRow } from '@/components/cart/CartItemRow';

interface CartSheetProps {
  className?: string;
  trigger?: React.ReactNode;
}

export function CartSheet({ className, trigger }: CartSheetProps) {
  const t = useTranslations('Cart');
  const [isOpen, setIsOpen] = useState(false);
  const { 
    items, 
    totalPrice, 
    totalQuantity, 
    clearCart 
  } = useCart();

  const hasItems = items.length > 0;
  
  const handleCloseCart = () => {
    setIsOpen(false);
  };
  
  const handleClearCart = () => {
    clearCart();
    // Keep the cart open after clearing to show the empty state
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className={className}>
        {trigger || <CartButton onClick={() => setIsOpen(true)} />}
      </SheetTrigger>
      
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader className="px-1">
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle className="text-lg font-medium">
                {t('your_cart')}
              </SheetTitle>
              {hasItems && (
                <SheetDescription className="text-sm text-muted-foreground">
                  {totalQuantity} {t('items')}
                </SheetDescription>
              )}
            </div>
          </div>
        </SheetHeader>

        <Separator className="my-4" />

        {!hasItems ? (
          <div className="flex h-full flex-col items-center justify-center space-y-4 p-8 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/50" />
            <div className="space-y-2">
              <h3 className="text-lg font-medium">{t('empty_cart')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('add_items_to_get_started')}
              </p>
            </div>
            <Button onClick={handleCloseCart} variant="outline">
              {t('continue_shopping')}
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4">
                {items.slice(0, 3).map((item) => (
                  <Link 
                    key={item.id} 
                    href={`/product/${item.id}`} 
                    className="flex items-center gap-3 hover:bg-accent/50 rounded-md p-2 -mx-2 transition-colors"
                    onClick={handleCloseCart}
                  >
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(item.price)} × {item.quantity}
                      </p>
                    </div>
                  </Link>
                ))}
                {items.length > 3 && (
                  <p className="text-sm text-muted-foreground text-center">
                    +{items.length - 3} more items
                  </p>
                )}
              </div>
            </ScrollArea>

            <SheetFooter className="flex flex-col gap-3 pt-4">
              <div className="flex w-full justify-between text-lg font-medium">
                <span>{t('subtotal')}</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              
              <div className="grid w-full gap-2">
                {/* <Button asChild size="lg" className="w-full">
                  <Link href="/checkout" onClick={handleCloseCart}>
                    {t('proceed_to_checkout')}
                  </Link>
                </Button>
                 */}
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  asChild
                >
                  <Link href="/cart" onClick={handleCloseCart}>
                    {t('view_full_cart')}
                  </Link>
                </Button>
              </div>
              
              <p className="text-center text-xs text-muted-foreground">
                {t('shipping_and_taxes_calculated_at_checkout')}
              </p>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
