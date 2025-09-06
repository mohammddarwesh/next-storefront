import { Product } from "@/types/product";

const BASE_URL = "https://fakestoreapi.com";


export async function getProducts(limit?: number ): Promise<Product[]> {
    const url = new URL(`${BASE_URL}/products`);
    if(limit){
        url.searchParams.set('limit', limit.toString());
    }
    const response = await fetch(url,{
        next:{
            revalidate:60*60*24 // 1 day
        }
    });
    if(!response.ok){
        throw new Error('Failed to fetch products');
    }
    return response.json();
}