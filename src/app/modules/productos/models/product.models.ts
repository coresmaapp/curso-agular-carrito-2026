export interface ProductoInterface{
    id: number;
    name: string;
    price: number;
    stock: number;
    category:ProductCategoy;
}

export type ProductCategoy = 'Ropa' | 'Calzado' | 'Accesorios';

export const PRODUCT_CATEGORIES: ProductCategoy[] = ['Ropa','Calzado', 'Accesorios']