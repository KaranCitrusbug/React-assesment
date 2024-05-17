import { ComponentPropsWithoutRef } from "react";

export type CustomButtonProps={
  isLoading?: boolean;
  className: string;
  type?: "button" | "submit" | "reset";
  buttonLabel: string;
  id : string
}& ComponentPropsWithoutRef<'button'>
