import { Form, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import "../styles/_Signup.scss";
import { VALIDATOR as pattern } from "../constant/PatternValidate";

const Signup = () => {
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
      phone: "",
      address: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    // Simulate an async submission process
    // will repalce by api

    await new Promise((resolve) => setTimeout(resolve, 2000));
    navigate("/login");
    reset();
    console.log("Form submitted:", data);
  };
  const onErrors = (errors) => {
    console.log("Failed validation!", errors);
  };

  return (
    <div className="signup">
      <div className="signup__flex-item-left">
        <Form
          className="signup__flex-item-left__form"
          onSubmit={handleSubmit(onSubmit, onErrors)}
          control={control}
        >
          <p>Start your journey with us</p>
          <h3>Sign Up To Our Service</h3>
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
                  message: "Password is not valid",
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
            Have an account? <Link to="/login">Sign In</Link>
          </p>
        </Form>
      </div>
      <div className="signup__flex-item-right"></div>
    </div>
  );
};

export default Signup;
