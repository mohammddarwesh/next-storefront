'use client';

import { useFilterState } from '@/hooks/useFilterState';
import { useTranslations } from 'next-intl';
import { CategoryOption } from '@/lib/types/filters';

interface CategoryFilterProps {
  categories: CategoryOption[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const t = useTranslations('Products');
  const { currentParams, updateParams } = useFilterState();

  const handleChange = (value: string) => {
    updateParams({ category: value });
  };

  return (
    <div>
      <label htmlFor="products-category" className="block text-sm font-medium mb-1">
        {t('categories')}
      </label>
      <select
        id="products-category"
        className="w-full p-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
        value={currentParams.category}
        onChange={(e) => handleChange(e.target.value)}
      >
        <option value="">{t('allCategories')}</option>
        {categories.map((category) => (
          <option key={category.id} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}