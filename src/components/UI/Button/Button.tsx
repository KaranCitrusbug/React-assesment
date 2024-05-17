import React,{ FC } from "react"
import { CustomButtonProps } from "./Button.type"

import './style.css'
const CustomButton :FC<CustomButtonProps> = ({
  buttonLabel,
  className,
  type,
  id,
  ...props
}) => {
  return (
    <button
    type={type}
    className={`${className}`}
    id={`${id}`}
    {...props}
  >
    {buttonLabel}
  </button>
  )
}

export default CustomButton
