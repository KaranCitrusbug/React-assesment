import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping , faCartShopping} from "@fortawesome/free-solid-svg-icons";

import MainHeader from "../Home/Header/Index";
import Footer from "../Home/Footer/Index";
import BuyProduct from "./BuyProduct";
import "./style.css";
const Index: React.FC = () => {
 
  return (
    <>
      <MainHeader>
        <div className="cart-section ">
          <h2 className="text-center py-3 myCart">
            My Cart
            <FontAwesomeIcon icon={faCartShopping } className="ms-3" />
          </h2>
          <BuyProduct/>
        </div>
      </MainHeader>
      <Footer />
    </>
  );
};

export default Index;
