export interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  current_page: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
  results: ProductInterface[];
}

export interface ProductInterface {
  id: number;
  name: string;
  description: string;
  price: string; 
  stock: number;
  category: number;
  category_name: string;
  image_url: string;
  is_active: boolean;
  created_by: number;
  created_by_username: string;
  created_at: string; // ISO date
  updated_at: string; // ISO date
  available_stock: number;
}

export interface ProductRequest {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: number;
  image_url?: string;
}

export interface ProductUpdate extends ProductRequest{
  created_by:number;
}