import * as yup from "yup"

export const validation = yup.object({
    name : yup.string().required("Name is Required").max(15,"Please Enter your short name").matches(/^[A-Za-z\s]+$/, "Name must contain only alphabetic characters"),
    email: yup.string().email("Enter a valid Email").required("Email is Required").matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,16})+$/,"Please Enter your valid Email"),
    phoneNumber : yup.string().required("Phone Number is required"),
    password : yup.string().required("Password is Required").min(8,"Your Password must be at least 8 character").max(14,"Your Password must be up to 14 character").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/,"Password must contain at least one uppercase, one lowercase, one number and one special character"),

    confirmPassword : yup.string().required("confirmPassword is Required").oneOf([yup.ref('password')], 'Passwords must match'),

});
export const loginValidation = yup.object({
    email: yup.string().required("Email is Required"),
    password : yup.string().required("Password is Required")
})