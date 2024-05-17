//  email and password fields.
import React, { FC } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase";
import { toast } from "react-toastify";

import CustomButton from "../../../UI/Button/Button";
import { loginProps } from "../../../../types/loginType";
import CustomInput from "../../../UI/InputField/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidation } from "../../../../utils/Index";

import images from "../../../../assets/AllImages";
import "./index.css";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginProps>({
    resolver: yupResolver(loginValidation),
  });
  const onSubmit: SubmitHandler<loginProps> = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success("Login successfully");
      navigate("/");
    } catch (err) {
      toast.error("Please check your credential");
    }
  };

  return (
    <div className="center-wrapper">
      <div className="LoginPage row">
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
              {errors.email && <span>{errors.email.message}</span>}
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
              {errors.password && <span>{errors.password.message}</span>}
              <br />
              <CustomButton
                type="submit"
                className="btn custom-button"
                buttonLabel="Login"
                id="btn"
              />
            </div>
            <Link to="/" className="text-center">
              Forgot Password?
            </Link>
            <div className="d-flex justify-content-center">
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
