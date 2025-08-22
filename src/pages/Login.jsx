import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { TbBrandGoogle, TbBrandFacebook, TbBrandTwitter } from "react-icons/tb";
import { FiLinkedin } from "react-icons/fi";
import Illustrator from '../assets/illustrator.png'
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const savedRemember = localStorage.getItem("rememberMe") === "true";

    setRemember(savedRemember); 

    if (savedRemember) {
      const savedEmail = localStorage.getItem("email") || "";
      const savedPassword = localStorage.getItem("password") || "";
      setEmail(savedEmail);
      setPassword(savedPassword);
    } else {
      setEmail(""); 
      setPassword("");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert("Password must be at least 8 chars, 1 capital, 1 number, 1 symbol");
      return;
    }

    if (remember) {
      localStorage.setItem("rememberMe", "true");
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    } else {
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
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

          <div className="login-remember my-4 form-check">
            <input
              type="checkbox"
              id="remember"
              className="form-check-input"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <label htmlFor="remember" className="form-check-label">
              Keep me signed in
            </label>
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
          src={Illustrator}
          alt="illustration"
          className="img-fluid"
        />
      </div>
    </div>
  );
}
