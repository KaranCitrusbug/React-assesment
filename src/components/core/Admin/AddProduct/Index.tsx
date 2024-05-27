import React, { useState } from "react";

import CustomButton from "../../../UI/Button/Button";
import MainHeader from "../../Home/Header/Index";
import AddProduct from "./AddProduct";
import ProductListing from "./ProductListing";
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
        <AddProduct
          isModalOpen={modalIsOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />
        <ProductListing />
      </div>
    </MainHeader>
  );
};

export default Index;
