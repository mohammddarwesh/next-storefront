import { Product } from "@/lib/types/product";



export async function getProducts(limit?: number): Promise<Product[]> {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://fakestoreapi.com';
    const url = new URL('/products', BASE_URL);
    console.log("Final URL:", url.toString());
    if(limit){
        url.searchParams.set('limit', limit.toString());
    }
    const response = await fetch(url,{
        next:{
            revalidate:3600 // 1 hour
        }
    });
    if(!response.ok){
        throw new Error('Failed to fetch products');
    }
    return response.json();
}