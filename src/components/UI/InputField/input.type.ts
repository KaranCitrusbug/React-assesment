import {  FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export interface CustomInputProps{
    type: string,
    label: string,
    placeholder : string,
    register : UseFormRegister<any>
    error ?: FieldErrors<FieldValues>;
    className : string,  
    name : string 
}