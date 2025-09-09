'use client';

import { useTranslations } from 'next-intl';
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
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
import Image from 'next/image';

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
    updateCartItemQuantity,
    removeFromCart
  } = useCart();

  const hasItems = items.length > 0;
  
  const handleCloseCart = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className={className}>
        {trigger || <CartButton onClick={() => setIsOpen(true)} />}
      </SheetTrigger>
      
      <SheetContent className="flex flex-col w-full sm:max-w-md h-full">
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
          <div className="flex h-full flex-col items-center justify-center space-y-6 p-8 text-center">
            <div className="rounded-full bg-muted p-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">{t('empty_cart')}</h3>
              <p className="text-muted-foreground max-w-sm">
                {t('add_items_to_get_started')}
              </p>
            </div>
            <div className="space-y-3 w-full max-w-xs">
              <Button onClick={handleCloseCart} className="w-full" size="lg">
                <ArrowRight className="h-4 w-4 mr-2" />
                {t('continue_shopping')}
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/products" onClick={handleCloseCart}>
                  Browse Products
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6 min-h-0">
              <div className="space-y-3 py-2">
                {items.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <Link 
                      href={`/product/${item.id}`}
                      onClick={handleCloseCart}
                      className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border hover:opacity-80 transition-opacity"
                    >
                      {typeof item.image === 'string' ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="64px"
                          className="object-cover object-center"
                        />
                      ) : (
                        <div className="h-full w-full bg-muted" aria-hidden />
                      )}
                    </Link>
                    
                    <div className="flex-1 min-w-0 space-y-2">
                      <Link 
                        href={`/product/${item.id}`}
                        onClick={handleCloseCart}
                        className="block"
                      >
                        <h4 className="text-sm font-medium line-clamp-2 hover:text-primary transition-colors">
                          {item.title}
                        </h4>
                      </Link>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-primary">
                          {formatPrice(item.price)}
                        </span>
                        
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 border rounded-md">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => {
                                if (item.quantity === 1) {
                                  removeFromCart(item.id);
                                } else {
                                  updateCartItemQuantity(item.id, item.quantity - 1);
                                }
                              }}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            
                            <span className="text-sm font-medium min-w-[2ch] text-center">
                              {item.quantity}
                            </span>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        Subtotal: {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t pt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('subtotal')}</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-muted-foreground">Calculated at checkout</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>
              
              <div className="grid w-full gap-3">
                <Button size="lg" className="w-full" asChild>
                  <Link href="/cart" onClick={handleCloseCart}>
                    <ArrowRight className="h-4 w-4 mr-2" />
                    {t('view_full_cart')}
                  </Link>
                </Button>
                
                <Button variant="outline" size="sm" onClick={handleCloseCart}>
                  {t('continue_shopping')}
                </Button>
              </div>
              
              <p className="text-center text-xs text-muted-foreground">
                {t('shipping_and_taxes_calculated_at_checkout')}
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
