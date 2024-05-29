import React from "react";
import { useSelector } from "react-redux";

import { ExclamationOutlined } from "@ant-design/icons";

import TotalBill from "./TotalBill";
import CartItem from "./CartItem";

import { RootState } from "../../../types/StateType";
import { ProductType } from "../../../types/ProductType";

import "./style.css";

const BuyProduct: React.FC = () => {
  const cartItem = useSelector((state: RootState) => state.cart.cart);
  const totalBill = useSelector((state: RootState) => state.cart.totalAmount);

  return (
    <div className="container ">
      {cartItem.length !== 0 ? (
        <div className="row ">
          <div className="col-8">
            {cartItem.length !== 0
              ? cartItem.map((product: ProductType) => (
                  <div key={product.id}>
                    <CartItem product={product} />
                  </div>
                ))
              : " "}
          </div>
          <div className="col-4 ">
            <div className="bg-white p-3 border ">
              <p className="m-0 pb-3 text-secondary border border-top-0 border-start-0 border-end-0">
                Summary
              </p>
              {cartItem.length !== 0
                ? cartItem.map((product: ProductType) => (
                    <div key={product.id}>
                      <TotalBill product={product} />
                    </div>
                  ))
                : " "}
              <div className="row pt-3 pb-3 mx-2 border border-bottom-0 border-start-0 border-end-0">
                <p className=" col-md-6 m-0">Total Amount : </p>
                <p className=" col-md-6 m-0 text-end">{totalBill}</p>
              </div>
              <button className="btn btn-success ms-3">Checkout</button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="empty-cart">
            Cart is Empty <ExclamationOutlined />
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyProduct;
