import { SignUpProps } from "../types/signUpType";
import { ToastFail } from "../utils/ToastMessage";
import api, { noAuthApi } from "../components/core/api/ApiURL";

// Register User
export const registerUser = async (userData: SignUpProps) => {
  try {
    const response = await noAuthApi.post("/register/", userData);
    return response.data;
  } catch (error:any) {
   ToastFail(error);
  }
};
export const VerifyToken = async (token: string | undefined) => {
  try {
    const authToken = await api.post(`verify-user/${token}/`);
    return authToken.data;
  } catch (error) {
   ToastFail("Error registering user:" + error);
    throw error;
  }
};

// Forgot Password Request
export const forgotPasswordRequest = async (email: string) => {
  try {
     return await noAuthApi.post("/forgot-password-request/", { email });
  
    
  } catch (error) {
   ToastFail("Error requesting password reset:"+ error);
    throw error;
  }
};

// Reset Password Request
export const resetPasswordRequest = async (
  token: string | undefined,
  newPassword: string
) => {
  try {
    const response = await api.post(`/reset-forgot-password/${token}`, {
      newPassword,
    });
    return response.data;
  } catch (error) {
   ToastFail("Error resetting password:"+ error);
    throw error;
  }
};

// Login
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post("/login/", { email, password });
    return response.data;
  } catch (error:any ) {
   ToastFail(error);
    throw error;
  }
};

// Change Password
export const changePassword = async (
  currentPassword: string,
  newPassword: string
) => {
  try {
    const response = await api.post("/reset-password/", {
      currentPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
   ToastFail("Error changing password:" + error);
    throw error;
  }
};
