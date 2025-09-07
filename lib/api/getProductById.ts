import { Product } from '@/lib/types/product';

export async function getProductById(id: string | number): Promise<Product> {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://fakestoreapi.com';
  const url = new URL(`/products/${id}`, BASE_URL);
  
  try {
    const response = await fetch(url.toString(), {
      next: {
        revalidate: 3600 // 1 hour
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }
    
    const product = await response.json();
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error('Failed to load product. Please try again later.');
  }
}