import React from "react";
import { ProductType } from "../../../types/ProductType";
import "./style.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../types/StateType";

interface CartItemProps {
  product: ProductType;
}
const CartItem: React.FC<CartItemProps> = ({ product }) => {
    
  return (
    <div className="card cart-card mb-3" key={product.id}>
      <div className="row g-0">
        <div className="col-md-2 cart-img">
          <img src={product.img} className="img-fluid" alt={product.name} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text description text-truncate">
              {product.description}
            </p>
            <h3 className="card-text">Price : ${product.price}<span>/Each</span></h3>
            <h6 className="card-text">Available Quantity : {product.quantity}</h6>
          </div>
        </div>
        <div className="col-md-2">
        
            <button className="btn btn-outline-danger">Remove</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
