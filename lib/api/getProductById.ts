
export async function getProductById(id: number) {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
    const url = new URL(`${BASE_URL}/products/${id}`);
    const response = await fetch(url, {
        next: {
            revalidate: 3600 // 1 hour
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch product');
    }
    return response.json();
}