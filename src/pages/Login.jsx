import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { API_URL } from "../config";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setMessage("Please enter your email and password.");
      return;
    }

    try {
  const response = await axios.post(
`${API_URL}/api/auth/login`,    {
      email: formData.email,
      password: formData.password,
    }
  );

  console.log("LOGIN RESPONSE:", response.data);

  localStorage.setItem(
    "user",
    JSON.stringify(response.data.user)
  );

  console.log(
    "SAVED USER:",
    JSON.parse(localStorage.getItem("user"))
  );

  if (response.data.user.role === "admin") {
    console.log("ADMIN DETECTED");
    navigate("/admin");
  } else {
    console.log("CUSTOMER DETECTED");
    navigate("/products");
  }

} catch (error) {
  console.error("Login Error:", error);

  setMessage(
    error.response?.data?.message ||
    "Unable to connect to server."
  );
}
  }

  return (
    <div className="login-page">

      <div className="login-visual">
        <div className="login-visual-overlay"></div>

        <div className="login-visual-content">

          <a href="/" className="login-logo">
            VELORA
          </a>

          <div className="login-visual-text">
            <p>WELCOME BACK</p>

            <h1>
              Good style
              <br />
              starts here.
            </h1>

            <span>
              Sign in to continue exploring your
              favourite VELORA essentials.
            </span>
          </div>

        </div>
      </div>


      <div className="login-container">

        <div className="login-box">

          <div className="login-heading">

            <p>WELCOME BACK</p>

            <h2>Sign in</h2>

            <span>
              Enter your details to access your account.
            </span>

          </div>


          <form onSubmit={handleSubmit}>

            {/* EMAIL */}
            <div className="login-form-group">

              <label>Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />

            </div>


            {/* PASSWORD */}
            <div className="login-form-group">

              <div className="password-label-row">

                <label>Password</label>

                <a href="/forgot-password">
                  Forgot password?
                </a>

              </div>

              <div className="login-password-wrapper">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="login-show-password"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>




            {/* MESSAGE */}
            {message && (
              <div
                className={
                  message
                    .toLowerCase()
                    .includes("successful")
                    ? "login-message success"
                    : "login-message error"
                }
              >
                {message}
              </div>
            )}


            {/* BUTTON */}
            <button
              type="submit"
              className="login-button"
            >
              Sign In
              <span>→</span>
            </button>

          </form>


          {/* SIGNUP */}
          <div className="signup-text">

            Don't have an account?

            <a href="/signup">
              Create one
            </a>

          </div>


          {/* BACK */}
          <div className="login-back-home">

            <a href="/">
              ← Back to home
            </a>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;