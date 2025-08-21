import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { TbBrandGoogle, TbBrandFacebook, TbBrandTwitter } from "react-icons/tb";
import { FiLinkedin } from "react-icons/fi";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert("Password must be at least 8 chars, 1 capital, 1 number, 1 symbol");
      return;
    }

    dispatch(setAuth(true));
    navigate("/home");
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2 className="login-title">Sign In</h2>
        <p className="login-subtitle">
          New user? <a href="#">Create an account</a>
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username or email"
            className="login-input mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="login-remember my-3">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Keep me signed in</label>
          </div>

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>

        <div className="divider">
          <span className="login-divider">Or Sign In With</span>
        </div>

        <div className="social-icons">
          <TbBrandGoogle />
          <TbBrandFacebook />
          <FiLinkedin />
          <TbBrandTwitter />
        </div>
      </div>
      <div
        xs={12}
        md={6}
        className="d-none d-md-flex align-items-center justify-content-center"
      >
        <img
          src="/illustration.svg"
          alt="illustration"
          className="img-fluid"
          style={{ maxHeight: "400px" }}
        />
      </div>
    </div>
  );
}
