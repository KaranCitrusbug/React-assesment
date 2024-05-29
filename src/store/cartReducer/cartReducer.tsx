import {
  CartActionTypes,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  BUY_NOW_PRODUCT,
} from "../../types/CartActionType";
import { CartState } from "../../types/CartStateProps";

const initialState: CartState = {
  cart: [],
  productData: [],
  totalAmount: 0,
};

const cartReducer = (
  state = initialState,
  action: CartActionTypes
): CartState => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity -= 1;
        const updateAmount = state.totalAmount + action.payload.price;
        return {
          ...state,
          cart: updatedCart,
          totalAmount: updateAmount,
        };
      } else {
        const updateAmount = state.totalAmount + action.payload.price;

        action.payload.quantity -= 1;
        return {
          ...state,
          cart: [...state.cart, { ...action.payload }],
          totalAmount: updateAmount,
        };
      }
    case REMOVE_FROM_CART:
      const removedItem = state.cart.find(
        (item) => item.id === action.payload.productId
      );
      
      // const updatedTotalAmount = state.totalAmount - (removedItem.price * action.payload.quantity);
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.productId),
        totalAmount: 1,
      };
    case INCREASE_QUANTITY:
      const existingItemIncrease = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIncrease !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIncrease].quantity += 1;
        //   updatedCart[existingItemIncrease].rating.count -= 1;
        const updateAmount = state.totalAmount + action.payload.price;
        return {
          ...state,
          cart: updatedCart,
          totalAmount: updateAmount,
        };
      }
      return state;

    case DECREASE_QUANTITY:
      const existingItemDecrease = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemDecrease !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemDecrease].quantity -= 1;
        //   updatedCart[existingItemDecrease].rating.count += 1;
        const decreaseAmount = state.totalAmount - action.payload.price;
        return {
          ...state,
          cart: updatedCart,
          totalAmount: decreaseAmount,
        };
      }
      return state;

    case BUY_NOW_PRODUCT:
      return {
        ...state,
        cart: [{ ...action.payload, quantity: 1 }],
        totalAmount: action.payload.price,
      };
    default:
      return state;
  }
};

export default cartReducer;
