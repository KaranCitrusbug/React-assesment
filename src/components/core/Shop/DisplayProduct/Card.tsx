import React from "react";
import { ProductType } from "../../../../types/ProductType";
import { ShoppingCartOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../store/cartReducer/cartAction";
import { toast } from "react-toastify";
import { RootState } from "../../../../types/StateType";

interface CardProps {
  products: ProductType[];
}
const Card: React.FC<CardProps> = ({ products }) => {
  const dispatch = useDispatch()
  const cartItem = useSelector((state: RootState) => state.cart.cart)
  
  const handleBuyProduct = (product : ProductType) =>[
    dispatch(addToCart(product)),
    toast.success("Product added to cart")
  ]

  return (
    <>
      {products.length != 0 ? (
        products.map((product) => {
          const cartDetail = cartItem.find((item) => item.id === product.id);
          
          return (
            <div className="col mt-3" key={product.id}>
              <div className="card shop-card h-100">
                <h5 className="card-header">{product.name}</h5>
                <img
                  src={product.img}
                  className="card-img-top img-fluid"
                  alt={product.name}
                />
                <div className="card-body">
                  <Link to={`/shop/${product.id}`}>
                    <p className="card-text description multiline-truncate">
                      {product.description}
                    </p>
                  </Link>
                  <div className="d-flex justify-content-between">
                    <p className="card-text">Category: </p>
                    <p>{product.category.value}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="card-text">Price: </p>
                    <p>${product.price}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="card-text">Quantity: </p>
                    <p> {cartDetail ? cartDetail?.quantity : product.quantity}</p>
                  </div>
                  <div className="d-flex justify-content-between flex-wrap ">
                    <button className="btn btn-warning m-1" >
                      <ThunderboltOutlined />
                      BUY NOW
                    </button>
                    <button className="btn btn-outline-secondary m-1" onClick={()=>handleBuyProduct(product)}>
                      <ShoppingCartOutlined />
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="d-flex justify-content-center">
          Sorry, Product Not available
        </div>
      )}
    </>
  );
};

export default Card;
