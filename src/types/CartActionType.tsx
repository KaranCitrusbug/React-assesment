import { Product } from "./CartStateProps";
import { ProductType } from "./ProductType";

// Define action type constants
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const BUY_NOW_PRODUCT = 'BUY_NOW_PRODUCT';



interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: Product;
}

interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  payload: {
    productId: string;
    quantity: number;
  };
}

interface IncreaseQuantityAction {
  type: typeof INCREASE_QUANTITY;
  payload: {
    price: number;
    id: string;
  };
}

interface DecreaseQuantityAction {
  type: typeof DECREASE_QUANTITY;
  payload: {
    price: number;
    id: string;
  };
}

interface BuyNowProductAction {
  type: typeof BUY_NOW_PRODUCT;
  payload: ProductType;
}


export type CartActionTypes = AddToCartAction | RemoveFromCartAction | IncreaseQuantityAction | DecreaseQuantityAction | BuyNowProductAction;
