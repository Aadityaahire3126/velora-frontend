import React, { useState } from "react";
import axios from "axios"
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

  if (
    !formData.name ||
    !formData.email ||
    !formData.password ||
    !formData.confirmPassword
  ) {
    setMessage("Please fill in all fields.");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    setMessage("Passwords do not match.");
    return;
  }

  try {
    const response = await axios.post(
      "https://velora-backend-34zo.onrender.com/api/auth/signup",
      {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }
    );

    setMessage(response.data.message);

    console.log("Signup Response:", response.data);

  } catch (error) {
    setMessage(
      error.response?.data?.message ||
      "Unable to connect to server."
    );
  }
};

  return (
    <div className="signup-page">

      {/* LEFT SIDE */}

      <div className="signup-visual">

        <div className="visual-overlay"></div>

        <div className="visual-content">

          <a href="/" className="signup-logo">
            VELORA
          </a>

          <div className="visual-text">
            <p>WELCOME TO VELORA</p>

            <h1>
              Your style.
              <br />
              Your story.
            </h1>

            <span>
              Discover thoughtfully designed essentials
              made for everyday living.
            </span>
          </div>

        </div>

      </div>


      {/* RIGHT SIDE */}

      <div className="signup-container">

        <div className="signup-box">

          <div className="signup-heading">

            <p>CREATE ACCOUNT</p>

            <h2>
              Join VELORA
            </h2>

            <span>
              Create your account and start exploring.
            </span>

          </div>


          <form onSubmit={handleSubmit}>

            {/* NAME */}

            <div className="form-group">

              <label>Full Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />

            </div>


            {/* EMAIL */}

            <div className="form-group">

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

            <div className="form-group">

              <label>Password</label>

              <div className="password-wrapper">

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="show-password"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>


            {/* CONFIRM PASSWORD */}

            <div className="form-group">

              <label>Confirm Password</label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

            </div>


            {/* TERMS */}

            <div className="terms">

              <input type="checkbox" required />

              <p>
                I agree to the{" "}
                <a href="/terms">Terms & Conditions</a>{" "}
                and{" "}
                <a href="/privacy">Privacy Policy</a>.
              </p>

            </div>


            {/* MESSAGE */}

            {message && (
              <div
                className={
                  message.includes("successfully")
                    ? "form-message success"
                    : "form-message error"
                }
              >
                {message}
              </div>
            )}


            {/* SUBMIT */}

            <button
              type="submit"
              className="signup-button"
            >
              Create Account
              <span>→</span>
            </button>

          </form>


          {/* LOGIN */}

          <div className="login-text">

            Already have an account?

            <a href="/login">
              Log in
            </a>

          </div>


          <div className="back-home">

            <a href="/">
              ← Back to home
            </a>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Signup;