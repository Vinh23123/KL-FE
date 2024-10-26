import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Login.scss";
import { Envelope, LockSimple } from "@phosphor-icons/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleNavigateSignUp = () => {
    console.log("hello");

    // navigate("/signup");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Checkpoint");

    if (!email || !password) return;
  };

  return (
    <div className="login">
      <div className="login__items">
        <div className="grid-two-colums">
          <div className="login__left-item text-align-center">
            <div>
              <h3 className="mb-20">Welcome to our service</h3>

              <p className="mb-20">
                Login using social media to get quick access
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
          <div className="text-align-center">
            <h1>Login to your account</h1>
            <p>
              Do you have account, yet ?
              <a className="login__signup" onClick={handleNavigateSignUp}>
                Sign Up
              </a>
              here
            </p>

            <form className="login__form" onSubmit={(e) => handleSubmit(e)}>
              <div className="login__form__items flex-align-center mb-20">
                {/* icon email */}
                <label htmlFor="email">
                  <Envelope size={26} />
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                />
              </div>
              <div className="login__form__items flex-align-center ">
                {/* icon password */}
                <label htmlFor="password">
                  <LockSimple size={26} />
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
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
