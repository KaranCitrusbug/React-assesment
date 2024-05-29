import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { auth } from "../../../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import {
  HomeOutlined,
  ProductOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";

import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

import Images from "../../../../assets/AllImages";
import CustomButton from "../../../UI/Button/Button";

import { RootState } from "../../../../types/StateType";

import { ConstValue } from "../../../../utils/ConstFile";

import "./style.css";
import { HeaderProps } from "../../../../types/Headerprops";


const Index: React.FC<HeaderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  const handleSignIn = () => {
    navigate("/login");
  };
  const cartItem = useSelector((state: RootState) => state.cart.cart)

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link rel="noopener noreferrer" to="/" className="btn">
          Change Password
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
          buttonLabel={user !== null ? "Logout" : "Login"}
          id="button"
          onClick={user !== null ? handleSignOut : handleSignIn}
        />
      ),
    },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

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
          <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
            <NavLink to="/">
              <HomeOutlined /> Home
            </NavLink>

            <NavLink to="/shop">
              <ShoppingOutlined /> Shop
            </NavLink>
            {user && user.email === ConstValue.Admin ? (
              <NavLink to="/admin/add-product">
                <ProductOutlined /> Add Product
              </NavLink>
            ) : (
              ""
            )}

            <NavLink to="/blog">Feedback</NavLink>
            <NavLink to="/about">About Us</NavLink>
          </div>
          <div className="d-flex cart-and-user">
            <Link to="/cart" className="ps-3">
              <button
                type="button"
                className="btn btn-warning position-relative"
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
