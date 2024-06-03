import { SignUpProps } from "../types/signUpType";
import { ToastFail } from "../utils/ToastMessage";
import api, { noAuthApi } from "../api/ApiURL";

// Register User
export const registerUser = async (userData: SignUpProps) => {
  try {
    const response = await noAuthApi.post("/register/", userData);
    return response.data;
  } catch (error:any) {
   ToastFail("Something went wrong" + error.message);
  }
};
export const VerifyToken = async (token: string | undefined) => {
  try {
    const authToken = await api.post(`verify-user/${token}/`);
    return authToken.data;
  } catch (error:any) {
   ToastFail("Error registering user:" + error.message);
    throw error;
  }
};

// Forgot Password Request
export const forgotPasswordRequest = async (email: string) => {
  try {
     return await noAuthApi.post("/forgot-password-request/", { email });
  
    
  } catch (error:any) {
   ToastFail("Error requesting password reset:"+ error.message);
    throw error;
  }
};

// Reset Password Request
export const resetPasswordRequest = async (
  token: string | undefined,
  password: string
) => {
  try {
    console.log()
    return await api.post(`/reset-forgot-password/${token}/`, {
      password,
    });
   
  } catch (error:any) {
   ToastFail("Error resetting password:"+ error.message);
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
  old_password: string,
  new_password: string
) => {
  try {
    const response = await api.post("/reset-password/", {
      old_password,
      new_password,
    });
    return response.data;
  } catch (error:any) {
   ToastFail("Error changing password:" + error.message);
    throw error;
  }
};

export const userProfile = async () =>{
  try{
    const user = await api.get("/profile/")
    return user.data.payload.user
  }
  catch (error:any) {
    ToastFail("USER NOT FOUND: " + error.message);
  }
}