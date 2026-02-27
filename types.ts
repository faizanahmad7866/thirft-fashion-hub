
export type Category = 'Hoodies' | 'T-Shirts' | 'Sweatshirts' | 'Jeans';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}
