import React, { useEffect } from "react";

import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  HomeOutlined,
  ProductOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Images from "../../../../assets/AllImages";
import CustomButton from "../../../UI/Button/Button";
import { RootState } from "../../../../types/StateType";
import { HeaderProps } from "../../../../types/Headerprops";
import { ConstValue } from "../../../../utils/ConstFile";
import { ToastFail } from "../../../../utils/ToastMessage";
import { login, logout } from "../../../../store/AuthReducer/authAction";

import "./style.css";

const Index: React.FC<HeaderProps> = ({ children }) => {
  const navigate = useNavigate();
  let loginUserState = useSelector(
    (state: RootState) => state.auth.isUserLoggedIn
  );
  let loginUserEmail = useSelector((state: RootState) => state.auth.user);
  const cartItem = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();
  const user = localStorage.getItem("accessToken");

  const handleSignOut = async () => {
    try {
      localStorage.clear();
      dispatch(logout());
    } catch (error: any) {
      ToastFail("Error signing out:" + error);
    }
  };
  const handleSignIn = () => {
    navigate("/login");
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link to="/profile" className="btn">
          Profile
        </Link>
      ),
    },
    // {
    //   key: "2",
    //   label: (
    //     <Link rel="noopener noreferrer" to="/" className="btn">
    //       <HeartFilled/>
    //      Whish List
    //     </Link>
    //   ),
    // },
    {
      key: "2",
      label: (
        <CustomButton
          type="button"
          className="btn"
          buttonLabel={loginUserState ? "Logout" : "Login"}
          id="button"
          onClick={loginUserState ? handleSignOut : handleSignIn}
        />
      ),
    },
  ];

  useEffect(() => {
    if (user) {
      dispatch(login(loginUserEmail!));
    }
  });

  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top  z-3">
        <div className="container d-flex justify-content-between">
          <NavLink className="navbar-brand text-decoration-none" to="/">
            <div className="logo d-flex justify-content-center align-center">
              <img
                src={Images.Logo}
                className="img-fluid logo-img"
                alt="Cloth Store Logo"
              />
            </div>
            <p className="title">ClothStore</p>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarSupportedContent"
          >
            <NavLink to="/">
              <HomeOutlined /> Home
            </NavLink>

            <NavLink to="/shop">
              <ShoppingOutlined /> Shop
            </NavLink>
            {loginUserEmail === ConstValue.Admin ? (
              <NavLink to="/admin/add-product">
                <ProductOutlined /> Add Product
              </NavLink>
            ) : (
              ""
            )}

            <NavLink to="/feedback">Feedback</NavLink>
            <NavLink to="/about">About Us</NavLink>
          </div>
          <div className="d-flex cart-and-user">
            <Link to="/cart" className="ps-3">
              <button
                type="button"
                className="btn position-relative"
                style={{ background: "#a2d2ff" }}
              >
                <div className="d-flex px-1 py-1 ">
                  <FontAwesomeIcon icon={faCartShopping} />
                  Cart
                </div>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartItem.length}
                  <span className="visually-hidden">unread messages</span>
                </span>
              </button>
            </Link>

            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <UserOutlined style={{ color: "black" }} />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </>
  );
};

export default Index;
