
import { ProductType } from '../../types/ProductType';
import { ADD_TO_CART, REMOVE_FROM_CART, INCREASE_QUANTITY, DECREASE_QUANTITY, BUY_NOW_PRODUCT } from '../../types/CartActionType';

// Action creators
export const addToCart = (product: ProductType) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (productId: string, quantity: number) => ({
  type: REMOVE_FROM_CART,
  payload: { productId, quantity },
});

export const increaseQuantity = (price: number, id: string) => ({
  type: INCREASE_QUANTITY,
  payload: { price, id },
});

export const decreaseQuantity = (price: number, id: string) => ({
  type: DECREASE_QUANTITY,
  payload: { price, id },
});

export const buyNowProduct = (product: ProductType) => ({
  type: BUY_NOW_PRODUCT,
  payload: product,
});
