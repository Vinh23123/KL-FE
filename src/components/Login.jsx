import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "../styles/_Login.scss";
import { Envelope, LockSimple } from "@phosphor-icons/react";
import { VALIDATOR as pattern } from "../constant/PatternValidate";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/slice/userSlice";
import { use } from "react";
import Spinner from "./Spinner";
import { toast } from "react-toastify";

const FAKE_USER = {
  email: "admin@gmail.com",
  password: "123456789",
};

const Login = ({ children }) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const {
    data: user,
    isLoading,
    isError,
    errorMSG,
    isAuthenticated,
  } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const borderRedEmail = errors.email ? `error-message` : "";
  const borderRedPassword = errors.password ? `error-message` : "";

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/home");
    } else if (errorMSG?.message) {
      console.log("Error: ", errorMSG);
      toast.error("User Name or Password is incorrect");
    }
  }, [isAuthenticated, errorMSG, navigate]);

  if (user) {
    window.localStorage.setItem("accessToken", user?.accessToken);
    window.localStorage.setItem("refreshToken", user?.refreshToken);
  }
  const handleChange = (e) => {
    // console.log(e.target);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear the error when user starts typing
  };

  const validateForm = (data) => {
    const newErrors = {}; // Create a new errors object instead of mutating the state

    if (!data.userName.trim()) {
      newErrors.userName = "User Name is required";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Checkpoint");
    const newErrors = validateForm(formData);
    // Object.keys(newErros) return an array of key of the object
    setErrors(newErrors);

    dispatch(
      userLogin({ userName: formData.userName, password: formData.password })
    );
  };
  // if (isLoading) return <Spinner />;
  return (
    <div className="login-container">
      <h1>Login</h1>

      <form className="login-container__form" onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-10 flex">
          <div className="login-container__form__items flex-align-center">
            {/* icon email */}
            <label htmlFor="email">
              <Envelope size={26} />
            </label>
            <input
              className={`${borderRedEmail}`}
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={(e) => handleChange(e)}
              placeholder="User Name"
            />
          </div>
          <div className="error-message-container">
            {errors.userName ? (
              <span className="error-message-alert">{errors.userName} </span>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="mb-10 flex">
          <div className="login-container__form__items flex-align-center ">
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
          <div className="error-message-container">
            {errors.password ? (
              <span className="error-message-alert">{errors.password}</span>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="login-container__form__sec">
          <div className="login-container__form__remember">
            <input type="checkbox" />
            <label htmlFor="">Remember me</label>
          </div>
          <div className="login-container__form__forgot">
            <a href="">Forgot password</a>
          </div>
        </div>
        <div className="mb-20">
          <Link className="login-container__signup" to="/booking-app/signup">
            Sign Up
          </Link>
        </div>
        <div>
          <button className="login-container__form__btn" type="submit">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
