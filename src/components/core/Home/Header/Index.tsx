import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Images from "../../../../assets/AllImages";
import CustomButton from "../../../UI/Button/Button";
import { auth } from "../../../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg  py-2">
        <div className="container d-flex justify-content-between">
          <NavLink className="navbar-brand text-decoration-none" to="/">
            <div className="logo d-flex justify-content-center">
              <img
                src={Images.Logo}
                className="img-fluid"
                alt="Cloth Store Logo"
              />
            </div>
            <p className="title">ClothStore</p>
          </NavLink>
          <div className=" d-flex flex-grow-1">
            <form className="d-flex flex-grow-1" role="search">
              <input
                className="form-control me-2 "
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-warning" type="submit">
                Search
              </button>
            </form>
          </div>
          <div className="d-flex">
            <Link to="/cart" className="ms-3 btn btn-outline-info text-decoration-none">
              Cart
            </Link>
            <CustomButton
              type="button"
              className="loginBtn ms-3"
              buttonLabel={user !== null ? "Logout" : "Login"}
              id="button"
              onClick={user !== null ? handleSignOut : handleSignIn}
            />
            
          </div>
        </div>
      </nav>
      <main className="container">{children}</main>
    </>
  );
};

export default Index;
