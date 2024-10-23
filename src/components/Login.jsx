import { useState } from "react";
import "../styles/Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
            <p>check</p>
          </div>
          <div className="text-align-center">
            <h3>Login</h3>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="flex-align-center mb-20">
                {/* icon email */}
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex-align-center">
                {/* icon password */}
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit"></button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
