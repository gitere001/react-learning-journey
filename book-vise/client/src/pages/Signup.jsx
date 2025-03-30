import React, { useState, useEffect } from "react";
import "../styles/auth.css";
import { Link, useNavigate } from "react-router-dom";
import { hideAuthPage, registerUser, resetFeedback, showAuthPage } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft } from "lucide-react";

const SignUp = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.userAuth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showSuccess, setShowSuccess] = useState(false);

  // Handle success/error messages
  useEffect(() => {
    if (success) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        navigate("/login");
        dispatch(resetFeedback());
        dispatch(showAuthPage())
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (error) {
      alert(error); // or display in UI
      dispatch(resetFeedback());
    }
  }, [success, error, navigate, dispatch]);

  const validateForm = () => {
    const newErrors = { username: "", email: "", password: "", confirmPassword: "" };
    let isValid = true;

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      isValid = false;
    }

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

    // Confirm Password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Only send necessary data to the backend
      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password
      };
      dispatch(registerUser(userData));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Create Account</h1>
        <button onClick={() => {navigate("/"); dispatch(hideAuthPage())}} className="back-button">
          <ArrowLeft size={24} />
        </button>

        {showSuccess && (
          <div className="auth-success-message">
            <p>Registration successful! Redirecting to login page...</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className={errors.username ? "input-error" : ""}
              disabled={loading}
            />
            {errors.username && <small className="error-text">{errors.username}</small>}
          </div>

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
            {errors.email && <small className="error-text">{errors.email}</small>}
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
            {errors.password && <small className="error-text">{errors.password}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={errors.confirmPassword ? "input-error" : ""}
              disabled={loading}
            />
            {errors.confirmPassword && (
              <small className="error-text">{errors.confirmPassword}</small>
            )}
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Registering...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;