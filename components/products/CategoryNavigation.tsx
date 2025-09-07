'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Category } from '@/lib/types/index';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

type CategoryNavigationProps = {
  categories: Category[];
};

export default function CategoryNavigation({ categories }: CategoryNavigationProps) {
  const t = useTranslations('Products');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = pathname.split('/').pop() || '';

  // Get all search params except category
  const getSearchParams = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('category');
    params.delete('page');
    return params.toString();
  };

  const searchQuery = getSearchParams();
  const queryString = searchQuery ? `?${searchQuery}` : '';

  // Format category name for display
  const formatCategory = (name: string) => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="w-full overflow-x-auto py-2">
      <div className="flex space-x-2 pb-2">
        <Link
          href={`/products${queryString}`}
          className={cn(
            'whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all',
            'border border-border hover:border-primary/50 hover:bg-accent/50',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            pathname === '/products' || pathname.endsWith('/products')
              ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:border-primary/90' 
              : 'text-foreground/80 hover:text-foreground'
          )}
        >
          {t('allCategories')}
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products/category/${category.slug}${queryString}`}
            className={cn(
              'whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all',
              'border border-border hover:border-primary/50 hover:bg-accent/50',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              currentCategory === category.slug
                ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:border-primary/90' 
                : 'text-foreground/80 hover:text-foreground'
            )}
            aria-current={currentCategory === category.slug ? 'page' : undefined}
          >
            {category.name}
          </Link>
        ))}
      </div>
      <div className="h-px bg-border w-full mt-2" />
    </div>
  );
}
