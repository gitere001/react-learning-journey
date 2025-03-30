import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import "../styles/auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  hideAuthPage,
  loginUser,
  resetFeedback,
} from "../features/auth/authSlice";

const Login = ({ setEmail }) => {
  const { isLoggedIn, loading, error } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // Handle login success and errors
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
      setEmail(formData.email);
      dispatch(hideAuthPage());
    }

    if (error) {
      alert(error.message || "Login failed. Please try again.");
      dispatch(resetFeedback());
    }
  }, [isLoggedIn, error, navigate, dispatch]);

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        dispatch(loginUser(formData));
      } catch (err) {
        console.error("Login failed:", err);
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <button
          onClick={() => {
            navigate("/");
            dispatch(hideAuthPage());
          }}
          className="back-button"
        >
          <ArrowLeft size={24} />
        </button>

        <h1 className="auth-title">Welcome Back</h1>

        {error && (
          <div className="auth-error-message">
            {typeof error === "string"
              ? error
              : "Login failed. Please try again."}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={errors.email ? "input-error" : ""}
              disabled={loading}
            />
            {errors.email && (
              <small className="error-text">{errors.email}</small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={errors.password ? "input-error" : ""}
              disabled={loading}
            />
            {errors.password && (
              <small className="error-text">{errors.password}</small>
            )}
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                Logging in...
              </>
            ) : (
              "Log In"
            )}
          </button>
        </form>
        <Link to="/forgot-password"  className="auth-link forget-password">
          Forgot password?
        </Link>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/signup" className="auth-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
