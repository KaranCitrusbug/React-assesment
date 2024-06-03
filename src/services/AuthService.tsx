import { SignUpProps } from "../types/signUpType";
import { ToastFail } from "../utils/ToastMessage";
import api, { noAuthApi } from "../api/ApiURL";

// Register User
export const registerUser = async (userData: SignUpProps) => {
  return await noAuthApi.post("/register/", userData);
};
export const VerifyToken = async (token: string | undefined) => {
  try {
    const authToken = await api.post(`verify-user/${token}/`);
    return authToken.data;
  } catch (error: any) {
    ToastFail("Error registering user:" + error.message);
    throw error;
  }
};

// Forgot Password Request
export const forgotPasswordRequest = async (email: string) => {
  return await noAuthApi.post("/forgot-password-request/", { email });
};

// Reset Password Request
export const resetPasswordRequest = async (
  token: string | undefined,
  password: string
) => {
    return await api.post(`/reset-forgot-password/${token}/`, {
      password,
    })
};

// Login
export const loginUser = async (email: string, password: string) => {
  const loginUser = await api.post("/login/", { email, password });
  if (loginUser.data.payload.user.is_verified) {
    return loginUser;
  } else {
    ToastFail("Please verify your email.");
  }
};

// Change Password
export const changePassword = async (
  old_password: string,
  new_password: string
) => {
  await api.post("/reset-password/", {
    old_password,
    new_password,
  });
};

export const userProfile = async () => {
  
   return await api.get("/profile/");
   
}
