import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
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

    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    if (!email || !password) {
      setMessage("Please enter your email and password.");
      return;
    }

    console.log("LOGIN EMAIL:", email);
console.log("ADMIN FLOW:", email === "admin@velora.com");

    // ADMIN: authenticate using MongoDB
    if (email === "admin@velora.com") {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setMessage(data.message || "Invalid admin email or password.");
          return;
        }

        if (data.user?.role !== "admin") {
          setMessage("This account is not an admin account.");
          return;
        }

        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/admin");
      } catch (error) {
        console.error("Admin Login Error:", error);
        setMessage("Unable to connect to server. Please try again.");
      }

      return;
    }

    // CUSTOMER: authenticate using Firebase
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = result.user;

      if (!user.emailVerified) {
        await signOut(auth);
        setMessage("Please verify your email before logging in.");
        return;
      }

      const userData = {
        uid: user.uid,
        name: user.displayName || "",
        email: user.email,
        role: "customer",
      };

      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/products");
    } catch (error) {
      console.error("Firebase Login Error:", error.code);

      const messages = {
        "auth/invalid-credential": "Invalid email or password.",
        "auth/user-not-found": "No account found. Please sign up first.",
        "auth/wrong-password": "Invalid email or password.",
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/too-many-requests": "Too many attempts. Please try again later.",
        "auth/network-request-failed": "Network error. Please try again.",
      };

      setMessage(
        messages[error.code] || "Unable to sign in. Please try again."
      );
    }
  };

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