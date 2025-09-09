import { Product } from "../types/index";

interface GetProductsByCategoryOptions {
  category: string;
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
}

export async function getProductsByCategory({
  category,
  page = 1,
  limit = 10,
  sort = 'asc',
  search = ''
}: GetProductsByCategoryOptions): Promise<{ products: Product[]; total: number }> {

    console.log("category from getProductsByCategory", category);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://fakestoreapi.com';
  
  // Decode the category first to handle any URL encoding, then re-encode it properly
  const decodedCategory = decodeURIComponent(category);
  const encodedCategory = encodeURIComponent(decodedCategory);
  
  const url = new URL(`/products/category/${encodedCategory}`, BASE_URL);
  
  // Add query parameters
  const params = new URLSearchParams();
  if (search) params.set('q', search);
  if (sort) params.set('sort', sort);
  
  const response = await fetch(`${url}?${params.toString()}`, {
    next: {
      revalidate: 3600 // 1 hour
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch products', {
      cause: response
    });
  }
  
  const products: Product[] = await response.json();
  
  // In a real API, these would be handled by the server
  let filteredProducts = [...products];
  
  if (search) {
    const searchTerm = search.toLowerCase();
    filteredProducts = filteredProducts.filter(product => 
      product.title.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  }
  
  // Sort products
  if (sort === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }
  
  // Pagination (client-side for now)
  const start = (page - 1) * limit;
  const paginatedProducts = filteredProducts.slice(start, start + limit);
  
  return {
    products: paginatedProducts,
    total: filteredProducts.length
  };
}