import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    const validationErrors = {};

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
      validationErrors.password = "Password must contain at least one lowercase letter";
    } else if (!/(?=.*[A-Z])/.test(data.password)) {
      validationErrors.password = "Password must contain at least one uppercase letter";
    } else if (!/(?=.*[!@#$%^&*])/.test(data.password)) {
      validationErrors.password = "Password must contain at least one special character";
    }

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      try {
        const url = "http://localhost:3001/api/auth";
        const { data: res } = await axios.post(url, data);
        navigate("/Dashboard");
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
      }
    } else {
      setError(validationErrors.email || validationErrors.password);
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
    setError("");
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            {/* {error && !data.email.trim() && (
              <div className={styles.error_msg}>{error}</div>
            )}
            {error && data.email.trim() && (
              <div className={styles.error_msg}>{error}</div>
            )} */}

            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && !data.password.trim() && (
              <div className={styles.error_msg}>{error}</div>
            )}
            {error && data.password.trim() && (
              <div className={styles.error_msg}>{error}</div>
            )}

            <div className={styles.right}>
              <Link to="/ForgotPassword">Forgot Password?</Link>
            </div>
            <button type="submit" className={styles.green_btn}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;