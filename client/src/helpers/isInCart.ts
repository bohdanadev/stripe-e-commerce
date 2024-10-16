import { ICartItem } from '../interfaces/product.interface';

export const isInCart = (id: number, cartItems: ICartItem[]) => {
  return cartItems.find((item) => item.id === id);
};
