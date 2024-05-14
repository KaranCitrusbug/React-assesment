import React,{ FC } from "react"
import { CustomButtonProps } from "./Button.type"
import { Button } from "antd"
import './style.css'
const CustomButton :FC<CustomButtonProps> = ({
  buttonLabel,
  className,
  htmlType,
  id,
  ...restProps
}) => {
  return (
    <Button
    htmlType={htmlType}
    className={`${className}`}
    id={`${id}`}
    {...restProps}
  >
    {buttonLabel}
  </Button>
  )
}

export default CustomButton
