import { Category } from '@/lib/types/index';

export async function getCategories(): Promise<Category[]> {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://fakestoreapi.com';

    const url = new URL('/products/categories', BASE_URL);
    const response = await fetch(url, {
        next: {
            revalidate: 3600 // 1 hour
        }
    });
    
    if (!response.ok) {
        throw new Error('Failed to fetch categories');
    }
    
    const categories = await response.json();
    console.log("categories from getCategories", categories);
    // Transform the string array into Category objects
    return categories.map((name: string, index: number) => ({
        id: `category-${index + 1}`,
        name: name.split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '),
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        description: ''
    }));
}