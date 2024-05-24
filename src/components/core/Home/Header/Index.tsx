import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { auth } from "../../../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";


import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";

import Images from "../../../../assets/AllImages";
import CustomButton from "../../../UI/Button/Button";

import { ConstValue } from "../../../../utils/ConstFile";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

import "./style.css";

interface HeaderProps {
  children: React.ReactNode;
}

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
      key: "1",
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
      <nav className="navbar navbar-expand-lg position-sticky top-0 z-3">
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

          <div className="flex-grow-1 ps-5">
            <NavLink to="/">Home</NavLink>

            {user && user.email === ConstValue.admin ? (
              <NavLink to="/admin/add-product">Add Product</NavLink>
            ) : (
              ""
            )}

            <NavLink to="/blog">Feedback</NavLink>
            <NavLink to="/about">About Us</NavLink>
          </div>
          <div className="d-flex">
            <div className="input-group">
              <input
                className="form-control searchBar"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div className="input-group-text">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </div>
            </div>
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
                  99+
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
      <main className="container">{children}</main>
    </>
  );
};

export default Index;
