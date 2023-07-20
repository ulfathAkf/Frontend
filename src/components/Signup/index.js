import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    const validationErrors = {};

    if (!data.name.trim()) {
      validationErrors.name = "Name is required";
    }

    if (!data.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      validationErrors.email = "Email is invalid";
    }

    if (!data.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (data.password.trim().length < 8) {
      validationErrors.password = "Password must be at least 8 characters long";
    } else if (!/(?=.*[a-z])/.test(data.password)) {
      validationErrors.password =
        "Password must contain at least one lowercase letter";
    } else if (!/(?=.*[A-Z])/.test(data.password)) {
      validationErrors.password =
        "Password must contain at least one uppercase letter";
    } else if (!/(?=.*[!@#$%^&*])/.test(data.password)) {
      validationErrors.password =
        "Password must contain at least one special character";
    }

    if (!data.confirmPassword.trim()) {
      validationErrors.confirmPassword = "Confirm Password is required";
    } else if (data.confirmPassword !== data.password) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    return validationErrors;
  };

  const handleChange = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
    setErrors("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const url = "http://localhost:3001/api/signup";
        const { data: res } = await axios.post(url, data);
        navigate("/login");
        console.log(res.data.message);
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setErrors({ message: error.response.data.message });
        }
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              value={data.name}
              required
              className={styles.input}
            />
            {errors.name && (
              <div className={styles.error_msg}>{errors.name}</div>
            )}

            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            {errors.email && (
              <div className={styles.error_msg}>{errors.email}</div>
            )}

            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {errors.password && (
              <div className={styles.error_msg}>{errors.password}</div>
            )}

            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleChange}
              value={data.confirmPassword}
              required
              className={styles.input}
            />
            {errors.confirmPassword && (
              <div className={styles.error_msg}>{errors.confirmPassword}</div>
            )}

            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>

            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
