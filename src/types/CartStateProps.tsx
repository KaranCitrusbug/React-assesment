import { ProductType } from "./ProductType";

export interface Product extends ProductType{
  totalProduct : number
}
export interface CartState {
    cart:  Product[];
    productData: ProductType[];
    totalAmount: number;
  }