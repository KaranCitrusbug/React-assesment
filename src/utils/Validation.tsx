import * as yup from "yup"
import { ConstValue } from "./ConstFile";

export const validation = yup.object({
    name : yup.string().required("Name is Required").max(15,"Please Enter your short name").matches(ConstValue.nameRegex, "Name must contain only alphabetic characters"),
    email: yup.string().required("Email is Required").matches(ConstValue.emailRegex,"Please Enter your valid Email"),
    phoneNumber : yup.string().required("Phone Number is required"),
    password : yup.string().required("Password is Required").min(8,"Your Password must be at least 8 character").max(14,"Your Password must be up to 14 character").matches(ConstValue.passwordRegex,"Password must contain at least one uppercase, one lowercase, one number and one special character"),

    confirmPassword : yup.string().required("confirmPassword is Required").oneOf([yup.ref('password')], 'Passwords must match'),

});
export const loginValidation = yup.object({
    email: yup.string().required("Email is Required"),
    password : yup.string().required("Password is Required")
})