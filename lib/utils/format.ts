import { useTranslations } from 'next-intl';

export function formatPrice(price: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(price);
}

export function useFormatPrice() {
  const t = useTranslations('Common');
  
  return (price: number, currency = 'USD') => {
    return new Intl.NumberFormat(t('locale'), {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(price);
  };
}
