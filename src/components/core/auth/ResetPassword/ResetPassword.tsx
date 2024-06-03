import React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { resetPasswordRequest } from "../../../../services/AuthService";
import { ToastSuccess, ToastFail } from "../../../../utils/ToastMessage";
import CustomInput from "../../../UI/InputField/input";
import { passwordValidation } from "../../../../utils/Validation";
import CustomButton from "../../../UI/Button/Button";
import image from "../../../../assets/AllImages";

import "./style.css";
const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ password: string }>({
    resolver: yupResolver(passwordValidation),
  });
  const onSubmit: SubmitHandler<{ password: string }> = async (data) => {
    try {
      await resetPasswordRequest(token, data.password);
      ToastSuccess("Password reset successfully");
      navigate("/login");
    } catch (error: any) {
      ToastFail("Failed to reset password" );
    }
  };

  return (
    <div className="center-wrapper">
      <div className="container row w-100 reset-password">
        <div className="col-6">
          <img
            src={image.newPassword}
            alt="password"
            className="img-fluid"
          />
        </div>
        <div className="col-6 px-5">
          <form onClick={handleSubmit(onSubmit)}>
            <CustomInput
              label="Enter your new Password: "
              type="password"
              placeholder="Password"
              register={register}
              error={errors}
              name="password"
              className="form-control"
            />
            {errors.password && (
              <span className="error">{errors.password.message}</span>
            )}
            <br />
            <CustomButton
              type="submit"
              className="btn custom-button"
              buttonLabel="submit"
              id="btn"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
