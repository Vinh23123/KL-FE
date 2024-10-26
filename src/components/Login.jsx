import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Login.scss";
import { Envelope, LockSimple } from "@phosphor-icons/react";
import { VALIDATOR as pattern } from "../constant/PatternValidate";
import { useEffect } from "react";

const FAKE_USER = {
  email: "admin@test.com",
  password: "123",
};

const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const borderRedEmail = errors.email ? `error-message` : "";
  const borderRedPassword = errors.password ? `error-message` : "";

  const handleNavigateSignUp = () => {
    console.log("switch to signup");
    navigate("/signup");
  };

  const handleChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear the error when user starts typing
  };

  const validateForm = (data) => {
    const newErrors = {}; // Create a new errors object instead of mutating the state

    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!pattern.email.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (data.confirmPassword !== data.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Checkpoint");
    const newErrors = validateForm(formData);
    // Object.keys(newErros) return an array of key of the object
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      if (
        formData.email === FAKE_USER.email &&
        formData.password === FAKE_USER.password
      ) {
        navigate("/home");
        console.log("Form submitted successfully!");
      }
    } else {
      console.log("Form submission failed due to validation errors.");
    }
  };

  return (
    <div className="login">
      <div className="login__items">
        <div className="grid-two-colums">
          <div className="login__left-item text-align-center">
            <div>
              <h3 className="mb-20">Welcome to our service</h3>

              <p className="mb-20">
                Login using social media to get quickly access
              </p>
            </div>
            <div>
              <button
                className="login__btn login__btn--face mb-20"
                type="submit"
              >
                Sign In Facebook
              </button>
              <button
                className="login__btn login__btn--google mb-20"
                type="submit"
              >
                Sign In Google
              </button>
              <button className="login__btn login__btn--tw" type="submit">
                Sign In Twitter
              </button>
            </div>
          </div>
          <div className="login__right-item text-align-center">
            <h1>Login to your account</h1>
            <p>
              Do you have account, yet ?
              <a className="login__signup" onClick={handleNavigateSignUp}>
                Sign Up
              </a>
              here
            </p>

            <form className="login__form" onSubmit={(e) => handleSubmit(e)}>
              <div className="mb-10 flex">
                <div className="login__form__items flex-align-center">
                  {/* icon email */}
                  <label htmlFor="email">
                    <Envelope size={26} />
                  </label>
                  <input
                    className={`${borderRedEmail}`}
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleChange(e)}
                    placeholder="Email address"
                  />
                </div>
                <div>
                  {errors.email ? (
                    <span className="error-message-alert">{errors.email} </span>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="mb-10 flex">
                <div className="login__form__items flex-align-center ">
                  {/* icon password */}
                  <label htmlFor="password">
                    <LockSimple size={26} />
                  </label>
                  <input
                    className={`${borderRedPassword}`}
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) => handleChange(e)}
                    placeholder="Password"
                  />
                </div>
                <div>
                  {errors.password ? (
                    <span className="error-message-alert">
                      {errors.password}
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <div className="login__form__sec">
                <div className="login__form__remember">
                  <input type="checkbox" />
                  <label htmlFor="">Remember me</label>
                </div>
                <div className="login__form__forgot">
                  <a href="">Forgot password</a>
                </div>
              </div>
              <div>
                <button className="login__form__btn" type="submit">
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
