import { LOGIN ,LOGOUT } from "../../types/AuthActionType";
export const login = (user:string) => ({
  type: LOGIN,
  payload: user
});

export const logout = () => ({
  type: LOGOUT,
});
