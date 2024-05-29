import React from "react";
import { useSelector } from "react-redux";

import { CloseOutlined } from "@ant-design/icons";

import { CartItemProps } from "../../../types/CartItemProps";
import { RootState } from "../../../types/StateType";

const TotalBill: React.FC<CartItemProps> = ({ product }) => {
  const cartItem = useSelector((state: RootState) => state.cart.cart);
  
  const findProduct = cartItem.find((item) => item.id === product.id);

  return (
    <div className="bg-white ">
      <div className="row pt-2  mb-4 mx-2">
        <div className="col-md-4 summary-product">{product.name}</div>
        <div className="col-md-4">
          <CloseOutlined />
          {findProduct?.totalProduct}
        </div>
        <div className="col-md-4 text-end">
          
          {findProduct ? findProduct?.totalProduct * product.price : ""}
        </div>
      </div>
      
    </div>
  );
};

export default TotalBill;
