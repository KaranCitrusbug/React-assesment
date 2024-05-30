import React, { FC } from 'react'
import { CustomInputProps } from './input.type'
import "./style.css"
const CustomInput: FC<CustomInputProps> = ({
    placeholder,
    register,
    type,
    label,
    className,name
}) => {
  return (
    <>
        <label>{label}</label>
        <input type={type} placeholder={placeholder} {...register(name)}  className={`${className}`}/>
        
    </>
  )
}

export default CustomInput
