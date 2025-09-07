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

  // Get all search params except category
  const getSearchParams = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('category');
    params.delete('page');
    return params.toString();
  };

  const searchQuery = getSearchParams();
  const queryString = searchQuery ? `?${searchQuery}` : '';

  // Get the current category slug from the URL
  const getCurrentCategorySlug = () => {
    const parts = pathname.split('/');
    const categoryIndex = parts.findIndex(part => part === 'category');
    if (categoryIndex !== -1 && parts[categoryIndex + 1]) {
      return decodeURIComponent(parts[categoryIndex + 1]);
    }
    return '';
  };

  const currentCategorySlug = getCurrentCategorySlug();
  console.log('Current category slug:', { currentCategorySlug, pathname });

  return (
    <div className="w-full overflow-x-auto py-2">
      <div className="flex space-x-2 pb-2">
        <Link
          href={`/products${queryString}`}
          className={cn(
            'whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all',
            'border border-border hover:border-primary/50 hover:bg-accent/50',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            !currentCategorySlug
              ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:border-primary/90' 
              : 'text-foreground/80 hover:text-foreground'
          )}
        >
          {t('allCategories')}
        </Link>
        {categories.map((category) => {
          const isActive = currentCategorySlug.toLowerCase() === category.slug.toLowerCase();
          console.log('Category:', { 
            name: category.name, 
            slug: category.slug, 
            currentSlug: currentCategorySlug, 
            isActive 
          });
          return (
            <Link
              key={category.id}
              href={`/products/category/${encodeURIComponent(category.slug)}${queryString ? `?${queryString}` : ''}`}
              className={cn(
                'whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all',
                'border border-border hover:border-primary/50 hover:bg-accent/50',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                isActive
                  ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:border-primary/90'
                  : 'text-foreground/80 hover:text-foreground'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              {category.name}
            </Link>
          );
        })}
      </div>
      <div className="h-px bg-border w-full mt-2" />
    </div>
  );
}
