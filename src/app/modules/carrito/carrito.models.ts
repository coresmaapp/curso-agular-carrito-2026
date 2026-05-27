export interface CartItemInterface {
    id: number;
    product: number;
    product_name: string;
    product_price: string;
    product_image?: string | null;
    quantity: number;
    subtotal: string;
    added_at: string;
  }
  
  export interface CartInterface {
    id: number;
    user: number;
    user_username: string;
    items: CartItemInterface[];
    total_items: number;
    total_amount: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  }
  
  export interface AddToCartPayload {
    product_id: number;
    quantity: number;
  }
  
  export interface UpdateCartItemPayload {
    item_id: number;
    quantity: number;
  }
  
  export interface CheckoutPayload {
    shipping_address: string;
    notes?: string;
  }
  