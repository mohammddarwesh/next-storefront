/**
 * Represents a paginated API response
 * @template T The type of items in the data array
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Represents query parameters for search and filtering
 * Can be extended with additional filters as needed
 */
export interface SearchParams {
  page?: string;
  limit?: string;
  sort?: string;
  search?: string;
  category?: string;
  [key: string]: string | string[] | undefined;
}
