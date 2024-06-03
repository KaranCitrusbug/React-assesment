import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BuyProduct from "./BuyProduct";
import MainHeader from "../Home/Header/Index";
import Footer from "../Home/Footer/Index";
import { RootState } from "../../../types/StateType";

import "./style.css";
const Index: React.FC = () => {
  const userLoggedIn = useSelector(
    (state: RootState) => state.auth.isUserLoggedIn
  );
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <>
      <MainHeader>
        <div className="position-relative">
          <div className="cart-section">
            {userLoggedIn ? (
              <>
                <h2 className="text-center py-3 myCart">
                  My Cart
                  <FontAwesomeIcon icon={faCartShopping} className="ms-3" />
                </h2>
                <BuyProduct />
              </>
            ) : (
              <div className="d-flex  flex-column">
                <h2 className="text-center py-3 myCart">
                  Missing your Cart Item?
                </h2>
                <p className="text-center">Login to see the items you added previously</p>
                <button className="btn custom-button m-auto" onClick={handleLogin}>
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </MainHeader>
      <Footer />
    </>
  );
};

export default Index;
