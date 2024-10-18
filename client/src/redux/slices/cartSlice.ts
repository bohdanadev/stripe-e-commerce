import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartItem, IProduct } from '../../interfaces/product.interface';

interface CartState {
  cartItems: ICartItem[];
  itemCount: number;
  total: number;
}

const initialCartFromStorage = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart') as string)
  : [];

const sumItems = (cartItems: ICartItem[]) => {
  return {
    itemCount: cartItems.reduce((total, item) => total + item.quantity, 0),
    total: cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ),
  };
};
const initialState: CartState = {
  cartItems: initialCartFromStorage,
  ...sumItems(initialCartFromStorage),
};

const storeCartItems = (cartItems: ICartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(cartItems));
};

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<IProduct>) => {
      const itemExists = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (!itemExists) {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      state.itemCount = sumItems(state.cartItems).itemCount;
      state.total = sumItems(state.cartItems).total;
      storeCartItems(state.cartItems);
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const increaseIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      state.cartItems[increaseIndex].quantity++;

      state.itemCount = sumItems(state.cartItems).itemCount;
      state.total = sumItems(state.cartItems).total;
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) item.quantity--;
      state.itemCount = sumItems(state.cartItems).itemCount;
      state.total = sumItems(state.cartItems).total;
      storeCartItems(state.cartItems);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      state.itemCount = sumItems(state.cartItems).itemCount;
      state.total = sumItems(state.cartItems).total;
      storeCartItems(state.cartItems);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.itemCount = 0;
      state.total = 0;
      localStorage.removeItem('cart');
    },
  },
});

const { reducer: cartReducer, actions } = cartSlice;

const cartActions = {
  ...actions,
};

export { cartActions, cartReducer };
