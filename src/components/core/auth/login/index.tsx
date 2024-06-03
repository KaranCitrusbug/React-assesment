//  email and password fields.
import React, { useEffect } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import CustomButton from "../../../UI/Button/Button";
import CustomInput from "../../../UI/InputField/input";
import { loginProps } from "../../../../types/loginType";
import { loginValidation } from "../../../../utils/Validation";
import { ToastFail, ToastSuccess } from "../../../../utils/ToastMessage";
import images from "../../../../assets/AllImages";
import { loginUser } from "../../../../services/AuthService";
import { login } from "../../../../store/AuthReducer/authAction";

import "./index.css";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginProps>({
    resolver: yupResolver(loginValidation),
  });
  const onSubmit: SubmitHandler<loginProps> = async (data) => {
    try {
      const loginCredential = await loginUser(data.email,data.password)
      if(loginCredential.payload.user.is_verified){
        const loginUserDetail = JSON.stringify(loginCredential.payload.tokens)
        dispatch(login(data.email))
        localStorage.setItem("accessToken",loginUserDetail)
        ToastSuccess("Login successfully")
        
        navigate('/')
      }
      else{
        ToastFail("Please verify your email.")
      }
    } catch (err) {
      ToastFail("Please check your credential" + err);
    }
  };
  const user = localStorage.getItem("accessToken")

 useEffect(()=>{
  if(user){
    ToastSuccess("You are already logged in")
    navigate('/')
  }
 },[user])

  return (
    <div className="center-wrapper">
      <div className=" row LoginPage">
        <div className="col-xl-6 col-lg-6 col-md-6 d-flex justify-content-center align-center">
          <div className="d-flex justify-content-center align-center">
            <img
              src={images.Login}
              alt="Login"
              className="img-fluid loginImg"
            />
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6">
        <div className="formField ">
          <h1>Login</h1>
          <hr />
          <form className=" formField flex-column" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <CustomInput
                label="Email: "
                type="email"
                placeholder="Email"
                register={register}
                error={errors}
                name="email"
                className="form-control"
              />
              {errors.email && <span className="error">{errors.email.message}</span>}
              <br />
              <CustomInput
                label="Password: "
                type="password"
                placeholder="Password"
                register={register}
                error={errors}
                name="password"
                className="form-control"
              />
              {errors.password && <span className="error">{errors.password.message}</span>}
              <br />
              <CustomButton
                type="submit"
                className="btn custom-button"
                buttonLabel="Login"
                id="btn"
              />
            </div>
            <Link to="/forgotPassword" className="text-center ">
              Forgot Password?
            </Link>
            <div className="d-md-flex justify-content-center">
              <p className="pe-1 ">Don't have an account? </p>
              <Link to="/signup">Create an account</Link>
            </div>
          </form>
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default Login;
