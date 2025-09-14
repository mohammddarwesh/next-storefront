'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2, X, ArrowLeft, ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useCart } from '@/hooks/useCart';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils/format';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
  const t = useTranslations('Cart');
  const router = useRouter();
  const {
    items,
    totalQuantity,
    totalPrice,
    removeFromCart,
    clearCart,
    updateCartItemQuantity,
  } = useCart();
  
  const [isClient, setIsClient] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [shippingOption, setShippingOption] = useState('standard');
  
  const shippingCost = shippingOption === 'express' ? 14.99 : 4.99;
  const taxRate = 0.08;
  const tax = totalPrice * taxRate;
  const orderTotal = totalPrice + shippingCost + tax;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) return;
    updateCartItemQuantity(id, quantity);
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t('promoApplied'));
  };



  if (!isClient) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-muted rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground/30" />
          <h1 className="mt-4 text-2xl font-bold tracking-tight">{t('emptyCart')}</h1>
          <p className="mt-2 text-muted-foreground">{t('startShopping')}</p>
          <Button asChild className="mt-6">
            <Link href="/products">
              {t('continueShopping')}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">{t('yourCart')}</h1>
        {items.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto text-destructive"
            onClick={() => {
              clearCart();
              toast.success(t('cartCleared'));
            }}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            {t('clearCart')}
          </Button>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">{t('cartItems')} ({totalQuantity})</h2>
              {items.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href={`/product/${item.id}`} className="h-32 w-full sm:h-24 sm:w-24 relative flex-shrink-0 overflow-hidden rounded-md border">
                        {item.image && (
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="(max-width: 640px) 100vw, 96px"
                            className="object-cover object-center hover:opacity-90 transition-opacity"
                          />
                        )}
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                          <Link href={`/product/${item.id}`} className="hover:underline flex-1">
                            <h3 className="font-medium hover:text-primary transition-colors line-clamp-2">{item.title}</h3>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 self-start sm:self-center"
                            onClick={(e) => {
                              e.preventDefault();
                              removeFromCart(item.id);
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {formatPrice(item.price)}
                        </p>
                        <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex items-center justify-center sm:justify-start">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-9 w-9 p-0 rounded-r-none"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <div className="h-9 w-12 border-t border-b border-input flex items-center justify-center text-sm font-medium">
                              {item.quantity}
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-9 w-9 p-0 rounded-l-none"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="text-center sm:text-right">
                            <div className="text-sm font-medium text-primary">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {item.quantity} × {formatPrice(item.price)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('orderSummary')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{t('subtotal')}</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                
                <div className="pt-2">
                  <h4 className="font-medium mb-2">{t('shipping')}</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingOption === 'standard'}
                        onChange={() => setShippingOption('standard')}
                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                      />
                      <span>{t('standardShipping')} ({formatPrice(4.99)})</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingOption === 'express'}
                        onChange={() => setShippingOption('express')}
                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                      />
                      <span>{t('expressShipping')} ({formatPrice(14.99)})</span>
                    </label>
                  </div>
                </div>

                <div className="pt-2">
                  <h4 className="font-medium mb-2">{t('promoCode')}</h4>
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <Input
                      placeholder={t('enterPromoCode')}
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" variant="outline">
                      {t('apply')}
                    </Button>
                  </form>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{t('subtotal')}</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('shipping')}</span>
                  <span>{formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('tax')}</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between font-semibold pt-2">
                  <span>{t('orderTotal')}</span>
                  <span>{formatPrice(orderTotal)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button 
                className="w-full" 
                size="lg" 
                disabled={items.length === 0}
              >
                {t('proceedToCheckout')}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                {t('secureCheckout')}
              </p>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('needHelp')}?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">{t('shippingInfo')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('shippingInfoDescription')}
                </p>
              </div>
              <div>
                <h4 className="font-medium">{t('returns')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('returnsDescription')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}