import React, { useState } from "react";

import ProductForm from "./ProductForm";
import ProductListing from "./ProductListing";
import MainHeader from "../../Home/Header/Index";
import CustomButton from "../../../UI/Button/Button";
import { ProductType } from "../../../../types/ProductType";
import { firebaseService } from "../../../../services/FirebaseService";

import "./style.css";

const Index: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);


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
