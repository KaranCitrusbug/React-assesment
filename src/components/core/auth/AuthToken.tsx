import React, { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { VerifyToken } from "../../../services/AuthService";
import { ToastFail, ToastSuccess } from "../../../utils/ToastMessage";
import { useApiCall } from "../../../services/UseApiCall";

const AuthToken: React.FC = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { call } = useApiCall();
  const verifyTokenEmail = async () => {
    call(
      () => VerifyToken(token),
      () => {
        ToastSuccess("Email verify successfully");
        navigate("/login");
      },
      (err) => {
        ToastFail(err.response.data.message);
      }
    );
  };
  useEffect(() => {
    verifyTokenEmail();
  });
  return <></>;
};

export default AuthToken;
