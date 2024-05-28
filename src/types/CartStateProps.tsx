import { ProductType } from "./ProductType";

export interface CartState {
    cart: ProductType[];
    productData: ProductType[];
    totalAmount: number;
  }