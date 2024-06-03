import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { forgotPasswordRequest } from "../../../../services/AuthService";
import { ToastSuccess, ToastFail } from "../../../../utils/ToastMessage";
import Image from "../../../../assets/AllImages";
import { forgotEmail } from "../../../../utils/Validation";
import CustomInput from "../../../UI/InputField/input";
import CustomButton from "../../../UI/Button/Button";

import './style.css'

const ForgotPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: yupResolver(forgotEmail),
  });

  const onSubmit: SubmitHandler<{ email: string }> = async (data) => {
    try {
      await forgotPasswordRequest(data.email);
      ToastSuccess("Password reset email sent successfully,Please cheack your email");
    } catch (error) {
      ToastFail("Failed to send password reset email"+error);
    }
  };

  return (
    <div className="center-wrapper">
      <div className="container row w-100 forgot-password">
        <div className="col-6 px-5">
          <p className="m-0 pb-3">
            Enter your emai and we'll send you a link to reset your password.
          </p>
          <form onClick={handleSubmit(onSubmit)}>
            <CustomInput
              label="Email: "
              type="email"
              placeholder="Email"
              register={register}
              error={errors}
              name="email"
              className="form-control"
            />
            {errors.email && (
              <span className="error">{errors.email.message}</span>
            )}

            <br />
            <CustomButton
              type="submit"
              className="btn custom-button"
              buttonLabel="Send Link"
              id="btn"
            />
          </form>
        </div>
        <div className="col-6 forgot-password">
          <img
            src={Image.email}
            alt="frgot-img"
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
