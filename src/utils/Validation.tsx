import * as yup from "yup"
import isValidPhoneNumber from "libphonenumber-js";
import { ConstValue } from "./ConstFile";

export const validation = yup.object({
    username : yup.string().required("User name is Required").matches(ConstValue.UserName, "User name  must start from alphabetic characters").max(15,"User name is to long").min(2,"User name is to short"),
    first_name : yup.string().required("First name is Required").max(20,"First name is to long").matches(ConstValue.NameRegex, "First Name must contain only alphabetic characters"),
    last_name : yup.string().required("Last name is Required").max(15,"Last name is to long").matches(ConstValue.NameRegex, "Last Name must contain only alphabetic characters"),
    email: yup.string().required("Email is Required").matches(ConstValue.EmailRegex,"Please Enter your valid Email"),
    phoneNumber :  yup
    .string()
    .test("phone-number", "Invalid phone number", (value) => {
      if (!value) return true; 
      const phoneNumber = isValidPhoneNumber("+" + value);
      return phoneNumber && phoneNumber.isValid();
    })
    .required("Phone number is required"),
    password : yup.string().required("Password is Required").min(8,"Your Password must be at least 8 character").max(14,"Your Password must be up to 14 character").matches(ConstValue.PasswordRegex,"Password contain at least one uppercase, one lowercase, one number and one special character"),

    confirmPassword : yup.string().required("confirmPassword is Required").oneOf([yup.ref('password')], 'Passwords must match'),

});
export const loginValidation = yup.object({
    email: yup.string().required("Email is Required"),
    password : yup.string().required("Password is Required")
})