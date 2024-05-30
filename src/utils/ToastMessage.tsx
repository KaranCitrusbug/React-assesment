import { toast } from "react-toastify";

export const ToastSuccess = (message: string) => {
  toast.success(message,{
    autoClose : 2000
  });
};

export const ToastFail = (message: string) => {
    toast.warning(message,{
      autoClose :2000
    })
  };
  