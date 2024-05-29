import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../types/StateType";
import { CartItemProps } from "../../../types/CartItemProps";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../../store/cartReducer/cartAction";

import "./style.css";

const CartItem: React.FC<CartItemProps> = ({ product }) => {
  const [buyingQuantity, setBuyingQuantity] = useState<number>(0);
  const cartItem = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();

  const handleRemove = (id: string, buyingQuantity: number) => {
    dispatch(removeFromCart(id, buyingQuantity));
  };

  const handleIncreaseQuantity = (price: number, id: string) => {
    dispatch(increaseQuantity(price, id));
  };
  const handleDecreaseQuantity =(price: number, id: string) => {
    dispatch(decreaseQuantity(price, id));
  };

  useEffect(() => {
    const findProduct = cartItem.find((item) => item.id === product.id);
    if (findProduct) {
      setBuyingQuantity(findProduct.totalProduct);
    }
  }, [cartItem]);

  return (
    <div className="card cart-card mb-3" key={product.id}>
      <div className="row g-0">
        <div className="col-md-2">
          <div className="cart-img d-flex flex-column justify-content-between ">
            <img
              src={product.img}
              className="img-fluid m-auto d-flex  align-middle"
              alt={product.name}
            />
          </div>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text description text-truncate">
              {product.description}
            </p>
            <h3 className="card-text">
              Price : ${product.price}
              <span>/Each</span>
            </h3>
            <h6 className="card-text">
              Available Quantity : {product.quantity}
            </h6>
          </div>
        </div>
        <div className="col-md-2">
          <div className="d-flex flex-column justify-content-between h-100">
            <div className="d-flex gap-1 select-quantity">
              <button
                className={`btn btn-outline-secondary ${product.quantity === 0 ? "disabled" : ""}`}
                onClick={() => {
                  handleIncreaseQuantity(product.price, product.id);
                }}
              >
                +
              </button>
              <input
                type="text"
                className="form-control"
                value={buyingQuantity}
              />
              <button className={`btn btn-outline-secondary ${buyingQuantity === 1 ? "disabled" : ""}`}
               onClick={() => {
                handleDecreaseQuantity(product.price, product.id);
              }}>-</button>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => handleRemove(product.id, buyingQuantity)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
