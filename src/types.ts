export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  calories: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
}
