import React from "react";
import { RootState } from "../../../types/StateType";
import { useSelector } from "react-redux";
import { ProductType } from "../../../types/ProductType";
import CartItem from "./CartItem";
import "./style.css";
import { ExclamationOutlined } from "@ant-design/icons";

const BuyProduct: React.FC = () => {
  const cartItem = useSelector((state: RootState) => state.cart.cart);
  return (
    <div className="container">
      {cartItem.length != 0 ? (
        <div className="row">
          <div className="col-8">
            {cartItem.length != 0
              ? cartItem.map((product: ProductType) => (
                  <CartItem product={product} />
                ))
              : " "}
          </div>
          <div className="col-4">hello</div>
        </div>
      ) : (
        <div>
          <div className="empty-cart">Cart is Empty <ExclamationOutlined /> </div>
        </div>
      )}
    </div>
  );
};

export default BuyProduct;
