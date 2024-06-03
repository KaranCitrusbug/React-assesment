import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MainHeader from "../Header/Index";
import { userProfile } from "../../../../services/AuthService";
import { ToastFail } from "../../../../utils/ToastMessage";
import { userInfo } from "../../../../types/UserProps";
import Footer from "../Footer/Index";
import Images from "../../../../assets/AllImages";
import { RootState } from "../../../../types/StateType";

const Index: React.FC = () => {
  const [user, setUser] = useState<userInfo>();
  const loggedUser = useSelector((state:RootState)=>state.auth.isUserLoggedIn)
  console.log(user);

  const getUser = async () => {
    try {
      const userInfo = await userProfile();
      setUser(userInfo);
    } catch (err) {
      ToastFail("User not found" + err);
    }
  };

  useEffect(() => {
    getUser();
  }, [loggedUser]);
  return (
    <>
      <MainHeader>
        <div
          className="m-auto"
          style={{ backgroundColor: "#f5f5f5", height: "80vh" }}
        >
          <div className="container">
            <div
              className="row w-100 justify-content-center "
              style={{ mixBlendMode: "darken" }}
            >
              <div className="col-md-6 col-lg-6 col-sm-12 m-auto">
                <div className="d-flex justify-content-center align-center">
                  <img
                    src={Images.user}
                    alt="user"
                    className="img-fluid m-auto"
                  />
                </div>
              </div>
              <div className="col-md-6 col-lg-6 col-sm-12 m-auto" >
                <div className="d-flex justify-content-between flex-column flex-wrap mt-5" style={{height:"100%"}}>
                
                    <div className="text-start">
                      <div className="w-100 mb-3">
                        <h3 className="text-wrap">{user?.email}</h3>
                      </div>
                      <div className="d-flex justify-content-start align-middle mb-3">
                        <h4 className="m-0">User Name : </h4>
                        <h4 className="m-0"> {user?.username}</h4>
                      </div>
                      <div className="d-flex mb-2">
                        <h5 className="m-0">First Name : </h5>
                        <h5 className="m-0">{user?.first_name}</h5>
                      </div>
                      <div className="d-flex">
                        <h5 className="m-0">Last Name : </h5>
                        <h5 className="m-0">{user?.last_name}</h5>
                      </div>
                    </div>
                  <div className="my-5">
                    <Link to='/changePassword' className="btn custom-button">Change Password</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainHeader>
      <Footer />
    </>
  );
};

export default Index;
