import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../../firebase";

import { ThunderboltOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import MainHeader from "../../../core/Home/Header/Index";
import Footer from "../../Home/Footer/Index";
import Card from "./Card";
import { ProductType } from "../../../../types/ProductType";

import "./style.css";

const SingleProduct: React.FC = () => {
  const userId = useParams<string>();
  const [singleProduct, setSingleProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([]);

  async function getData(id: string | undefined) {
    try {
      if (id) {
        const product = doc(db, "products", id);
        const productSnap = await getDoc(product);
        const productData = productSnap.data() as ProductType;
        setSingleProduct(productData);
        if (productData) {
          const relatedQuery = query(
            collection(db, "products"),
            where("category.value", "==", productData.category.value),
            where("id", "!=", productData.id)
          );

          onSnapshot(relatedQuery, function productsList(snapShort) {
            const relatedProductsData: ProductType[] = [];
            snapShort.docs.forEach((products) => {
              relatedProductsData.push({
                id: products.id,
                name: products.data().name,
                img: products.data().img,
                category: products.data().category,
                description: products.data().description,
                price: products.data().price,
                quantity: products.data().quantity,
              });
            });
            setRelatedProducts(relatedProductsData);
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getData(userId.id);
  }, [userId]);
  return (
    <>
      <MainHeader>
        {loading ? (
          <div className="center-wrapper">
            <Spin className="loadingProduct" />
          </div>
        ) : (
          <div className="container">
            <div className="row singleProduct my-5 ">
              <div className="col-6 ">
                <div className="d-flex justify-content-center align -center">
                  <img
                    src={singleProduct?.img}
                    alt={singleProduct?.name}
                    className="img-fluid SingleImage"
                  />
                </div>
                <div className="d-flex justify-content-between gap-1">
                  <button className="btn btn-warning flex-grow-1">
                    {" "}
                    <ThunderboltOutlined />
                    BUY NOW
                  </button>
                  <button className="btn btn-secondary flex-grow-1">
                    {" "}
                    <ThunderboltOutlined />
                    ADD TO CART
                  </button>
                </div>
              </div>
              <div className="col-6">
                <h3 className="singleProductName">{singleProduct?.name}</h3>
                <h6>{singleProduct?.description}</h6>
                <div className="d-flex justify-content-between mt-3">
                  <h4 className="singleProductPrice">Special Price : </h4>
                  <h2> $ {singleProduct?.price}</h2>
                </div>
                <h5>Category : {singleProduct?.category.value}</h5>
                <h5 className="mt-3">
                  Available Product : {singleProduct?.quantity}
                </h5>
                {singleProduct?.quantity === 0 ? (
                  <h5 className="mt-3 text-danger">Out of Stock</h5>
                ) : (
                  ""
                )}
              </div>
            </div>
            <h2 className="mb-5">You might be interested in</h2>
            {relatedProducts.length !== 0 ? (
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-4 mb-5">
                <Card products={relatedProducts} />
              </div>
              
            ) : (
              ""
            )}
          </div>
        )}
      </MainHeader>

      <Footer />
    </>
  );
};

export default SingleProduct;
