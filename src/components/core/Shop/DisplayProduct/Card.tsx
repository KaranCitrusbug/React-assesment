import React from "react";
import { ProductType } from "../../../../types/ProductType";
import { ShoppingCartOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

interface CardProps {
  products: ProductType[];
}
const Card: React.FC<CardProps> = ({ products }) => {
  return (
    <>
      {products.length != 0 ? (
        products.map((product) => {
          return (
            <div className="col mt-3" key={product.id}>
              <div className="card h-100">
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
                    <p>{product.quantity}</p>
                  </div>
                  <div className="d-flex justify-content-between flex-wrap ">
                    <button className="btn btn-warning m-1">
                      <ThunderboltOutlined />
                      BUY NOW
                    </button>
                    <button className="btn btn-outline-secondary m-1">
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
