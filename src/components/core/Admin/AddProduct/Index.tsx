import React, { useState } from "react";

import { db } from "../../../../firebase"
import { addDoc, collection } from "firebase/firestore";

import MainHeader from "../../Home/Header/Index";
import ProductForm from "./ProductForm";
import ProductListing from "./ProductListing";
import CustomButton from "../../../UI/Button/Button";

import "./style.css";
import { ProductType } from "../../../../types/ProductType";
import { firebaseService } from "../../../../services/FirebaseService";

const Index: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const productData = collection(db, "products");

  const handleAddProduct = () => {
    setModalIsOpen(true);
  };
  const handleOk = () => {
    setModalIsOpen(false);
  };
  const handleCancel = () => {
    setModalIsOpen(false);
  };
  const handleProduct = async (values: ProductType) => {
    firebaseService.addProductData(values)
  };

  return (
    <MainHeader>
      <div className="container add-product">
        <div className="d-flex justify-content-between mt-3">
          <div>
            <h2>Products:</h2>
          </div>
          <CustomButton
            type="submit"
            buttonLabel="+ Add Product"
            className="ant-btn okButton"
            id="btn"
            onClick={handleAddProduct}
          />
        </div>

        <ProductForm
          isModalOpen={modalIsOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          onSubmit={handleProduct}
          okText="Add Product"
        />
        <ProductListing />
      </div>
    </MainHeader>
  );
};

export default Index;
