import { Form, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import "../styles/_Signup.scss";
import { VALIDATOR as pattern } from "../constant/PatternValidate";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import apiClient from "../services/apiClient";
import { toast } from "react-toastify";

const Signup = () => {
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);
  const [registerResponse, setRegisterResponse] = useState({});
  const [error, setError] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      phone: "",
      password: "",
    },
  });
  useEffect(() => {
    if (error) {
      console.log("Error: ", error.message);

      toast.error(error?.message);
    }
  }, [error]);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    // Simulate an async submission process
    // will repalce by api
    console.log(data);
    try {
      setIsLoadingRegister(true);
      const roomsRespone = await apiClient.post(`auth/signup`, {
        userName: data.userName,
        email: data.email,
        password: data.password,
        role: ["user"],
      });
      console.log(
        "RoomsRespone Data: ",
        JSON.stringify(roomsRespone.data?.data?.pageNo, null, 2)
      );
      setRegisterResponse(roomsRespone.data?.data);
      toast.success("Register Successfully");
      setIsLoadingRegister(false);
      navigate("/booking-app/login");
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoadingRegister(false);
    }
  };

  if (isLoadingRegister) return <Spinner />;

  return (
    <div className="signup">
      <div className="signup__flex-item-left">
        <Form
          className="signup__flex-item-left__form"
          onSubmit={handleSubmit(onSubmit)}
          control={control}
        >
          <p>Start your journey with us</p>
          <h3>Sign Up To Our Service</h3>
          <div className="signup__flex-item-left__group-items">
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="signup__flex-item-left__input"
              {...register("firstName")}
              //ARIA (Accessible Rich Internet Applications)
              aria-invalid={errors.firstName ? "true" : "false"}
              placeholder="First Name"
            />

            {errors && (
              <span className="signup__flex-item-left__errors">
                {errors.firstName?.message}
              </span>
            )}
          </div>
          <div className="signup__flex-item-left__group-items">
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="signup__flex-item-left__input"
              {...register("lastName")}
              //ARIA (Accessible Rich Internet Applications)
              aria-invalid={errors.lastName ? "true" : "false"}
              placeholder="Last Name"
            />

            {errors && (
              <span className="signup__flex-item-left__errors">
                {errors.lastName?.message}
              </span>
            )}
          </div>
          <div className="signup__flex-item-left__group-items">
            <input
              type="text"
              id="userName"
              name="userName"
              className="signup__flex-item-left__input"
              {...register("userName", {
                required: "This field is required",
                minLength: {
                  value: 5,
                  message: "User Name should be at least 5 characters",
                },
                maxLength: {
                  value: 20,
                  message: "User Name should be at max 20 characters",
                },
              })}
              //ARIA (Accessible Rich Internet Applications)
              aria-invalid={errors.userName ? "true" : "false"}
              placeholder="User Name"
            />

            {errors && (
              <span className="signup__flex-item-left__errors">
                {errors.userName?.message}
              </span>
            )}
          </div>

          <div className="signup__flex-item-left__group-items">
            <input
              type="text"
              id="phone"
              name="phone"
              className="signup__flex-item-left__input"
              {...register("phone", {
                required: "This field is required",
                minLength: {
                  value: 10,
                  message: "Phone should be at least 11 characters",
                },
              })}
              //ARIA (Accessible Rich Internet Applications)
              aria-invalid={errors.phone ? "true" : "false"}
              placeholder="Phone"
            />
            {errors && (
              <span className="signup__flex-item-left__errors">
                {errors.phone?.message}
              </span>
            )}
          </div>
          <div className="signup__flex-item-left__group-items">
            <input
              type="text"
              id="email"
              name="email"
              className="signup__flex-item-left__input"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: pattern.email,
                  message: "Invalid email format",
                },
              })}
              aria-invalid={errors.email ? "true" : "false"}
              placeholder="Email"
            />
            {errors && (
              <span className="signup__flex-item-left__errors">
                {errors.email?.message}
              </span>
            )}
          </div>
          <div className="signup__flex-item-left__group-items">
            <input
              type="password"
              id="password"
              name="password"
              className="signup__flex-item-left__input"
              {...register("password", {
                required: "This field is required",
                min: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                max: {
                  value: 25,
                  message: "Password must be maximum at 25 characters",
                },
                pattern: {
                  // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
                  // example pass: Password1@
                  value: pattern.password,
                  message:
                    "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
                },
              })}
              aria-invalid={errors.password ? "true" : "false"}
              placeholder="Password"
            />
            {errors && (
              <span className="signup__flex-item-left__errors">
                {errors.password?.message}
              </span>
            )}
          </div>
          {/* <p>Is Dirty: {isDirty ? "Yes" : "No"}</p>
          <p>Dirty Fields: {JSON.stringify(dirtyFields)}</p> */}
          <button className="signup__flex-item-left__btn" type="submit">
            {isSubmitting ? "Signing up ..." : "Sign up"}
          </button>
          <p>
            Have an account? <Link to="/booking-app/login">Sign In</Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
