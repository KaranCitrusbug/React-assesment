//  name, email, phone number,  password, and confirm password fields.
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { Controller, SubmitHandler, useForm } from "react-hook-form";

import PhoneInput from "react-phone-input-2";
import { yupResolver } from "@hookform/resolvers/yup";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase";

import { SignUpProps } from "../../../../types/signUpType";
import CustomInput from "../../../UI/InputField/input";
import CustomButton from "../../../UI/Button/Button";
import images from "../../../../assets/AllImages";
import { validation } from "../../../../utils/Index";

import "react-phone-input-2/lib/material.css";
import "./index.css";
import { onChange } from "react-toastify/dist/core/store";

const Index: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpProps>({
    resolver: yupResolver(validation),
    mode: "onChange" 
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignUpProps> = async ({
    email,
    password,
    name,
  }) => {
    let userDetails = createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((userCredential) => {
      const user = userCredential.user;
    });
    navigate("/login");
  };
  return (
    <div className="center-wrapper">
      <div className="row signUp">
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
          <div>
            <h1>Sign Up</h1>
            <hr />
            <form
              className="formField flex-column"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <CustomInput
                  type="text"
                  label="Name: "
                  placeholder="Enter your Name"
                  register={register}
                  error={errors}
                  className="form-control"
                  name="name"
                />
                {errors.name && <span>{errors.name.message}</span>}
                <br />
                <CustomInput
                  type="email"
                  label="Email: "
                  placeholder="Enter your Email"
                  register={register}
                  error={errors}
                  className="form-control"
                  name="email"
                />
                {errors.email && <span>{errors.email.message}</span>}
                <br />
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <PhoneInput
                        country={"in"}
                        value={value}
                        onChange={onChange}
                      />
                      {errors.phoneNumber && (
                        <span>{errors.phoneNumber.message}</span>
                      )}
                    </>
                  )}
                />
                <br />
                <CustomInput
                  type="password"
                  label="Password: "
                  placeholder="Enter your Password"
                  register={register}
                  error={errors}
                  className="form-control"
                  name="password"
                />
                {errors.password && <span>{errors.password.message}</span>}
                <br />
                <CustomInput
                  type="password"
                  label="Conform Password: "
                  placeholder="Please Enter password again"
                  register={register}
                  error={errors}
                  className="form-control"
                  name="confirmPassword"
                />
                {errors.confirmPassword && (
                  <span>{errors.confirmPassword.message}</span>
                )}
                <br />
                <CustomButton
                  type="submit"
                  className="btn custom-button"
                  buttonLabel="Sign Up"
                  id="btn"
                />
              </div>
              <div className="d-flex mt-3">
                <p className="pe-1">Already have an account? </p>
                <Link to="/login">Login</Link>
              </div>
            </form>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 d-lg-flex d-xl-flex d-md-flex d-sm-none d-none d-flex justify-content-center align-center">
          <div className="d-flex justify-content-center align-center">
            <img
              src={images.SignUp}
              alt="Login"
              className="img-fluid signUpImg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;