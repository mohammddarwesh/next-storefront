import { Category } from '@/lib/types/index';
import { unstable_cache } from 'next/cache';

const fetchCategories = async (): Promise<Category[]> => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://fakestoreapi.com';
  const url = new URL('/products/categories', BASE_URL);
  const response = await fetch(url, {
    next: { revalidate: 3600, tags: ['categories'] },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  const categories = await response.json();
  // Transform the string array into Category objects
  return categories.map((name: string, index: number) => {
    const displayName = name
      .split(' ')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

    const slug = name.toLowerCase();

    return {
      id: `category-${index + 1}`,
      name: displayName,
      slug,
      description: '',
    } as Category;
  });
};

const cachedGetCategories = unstable_cache(fetchCategories, ['categories'], {
  revalidate: 3600,
  tags: ['categories'],
});

export async function getCategories(): Promise<Category[]> {
  return cachedGetCategories();
}