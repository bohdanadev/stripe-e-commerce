export interface IProduct {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
}

export interface ICartItem extends IProduct {
  quantity: number;
}
