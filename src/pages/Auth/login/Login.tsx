//  email and password fields.
import React, { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import CustomButton from "../../../components/UI/Button/Button";
import { loginProps } from "../../../types/loginType";
import Link from "antd/es/typography/Link";
import "./login.css";

const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginProps>({
    defaultValues:{
      email:"",
      password:""
    },
  });
  const onSubmit: SubmitHandler<loginProps> = (data) => console.log(data);
  return (
    <div className="center-wrapper">
      <div className="LoginPage">
      <h1>Login Form</h1>
      <div className="formField">
        <form onSubmit={handleSubmit(onSubmit)}>
        
          <div>
            <label>Email :</label>
            <div>
              <input {...register("email",{
                required:"Email is required",
                pattern:{
                  value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message:"Please check your Email"
                }
              })} />
            </div>
          </div>
          <div>
            <label>Password :</label>
            <div>
              <input
                {...register("password", {
                  required: "Password is Required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 character",
                  },
                })}
              />
            </div>
          </div>
          <div>
            <CustomButton
              htmlType="submit"
              className="custom-button"
              buttonLabel="Submit"
              id="btn"
            />
          </div>
          <Link>Forgot Password?</Link>
          <h3>Don't have an account? </h3><Link>Sign Up</Link>
        </form>
      </div>
      </div>
      
    </div>
  );
};

export default Login;
