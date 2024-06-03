import React, { useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { changePassword, forgotPasswordRequest } from "../../../../services/AuthService";
import { ToastSuccess, ToastFail } from "../../../../utils/ToastMessage";
import Image from "../../../../assets/AllImages";
import { resetPassword } from "../../../../utils/Validation";
import CustomInput from "../../../UI/InputField/input";
import CustomButton from "../../../UI/Button/Button";
import { ChangePasswordProps } from "../../../../types/ChangePasswordType";

const ChangePassword: React.FC = () => {

  const navigate =useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordProps>({
    resolver: yupResolver(resetPassword),
  });

  const onSubmit: SubmitHandler<ChangePasswordProps> = async (data) => {
    try{

      await changePassword(data.old_password,data.new_password)
      ToastSuccess("Password updated successfully")
      localStorage.clear(); 
      navigate(-1)
      
    }
    catch(err){
      ToastFail("Password not change,try again" + err)
    }
  };

  return (
    <div className="center-wrapper">
      <div className="container row w-100 ">
        <div className="col-6">
          <img
            src={Image.newPassword}
            alt="frgot-img"
            className="img-fluid"
            style={{mixBlendMode:"darken"}}
          />
        </div>
        <div className="col-6">
          <form onClick={handleSubmit(onSubmit)}>
          <CustomInput
              type="password"
              label="Old Password: "
              placeholder="Enter your old Password"
              register={register}
              error={errors}
              className="form-control"
              name="old_password"
            />
            {errors.old_password && (
              <span className="error">{errors.old_password.message}</span>
            )}
            <br/>
            <CustomInput
              type="password"
              label="Password: "
              placeholder="Enter your new Password"
              register={register}
              error={errors}
              className="form-control"
              name="new_password"
            />
            {errors.new_password && (
              <span className="error">{errors.new_password.message}</span>
            )}
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
              <span className="error">{errors.confirmPassword.message}</span>
            )}
            <br />
            <CustomButton
              type="submit"
              className="btn custom-button"
              buttonLabel="Change Password"
              id="btn"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
