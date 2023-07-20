import React, { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { Link,useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    const validationErrors = {};

    if (!password.trim()) {
      validationErrors.password = "Password is required";
    } else if (password.trim().length < 8) {
      validationErrors.password = "Password must be at least 8 characters long";
    } else if (!/(?=.*[a-z])/.test(password)) {
      validationErrors.password =
        "Password must contain at least one lowercase letter";
    } else if (!/(?=.*[A-Z])/.test(password)) {
      validationErrors.password =
        "Password must contain at least one uppercase letter";
    } else if (!/(?=.*[!@#$%^&*])/.test(password)) {
      validationErrors.password =
        "Password must contain at least one special character";
    }

    return validationErrors;
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
    setError("");
  };

  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors.password);
      return;
    }

    if (password !== confirmPassword) {
      setError("Password and confirm password do not match");
      return;
    }

    try {
      const url = "http://localhost:3001/reset-password";
      const path = window.location.pathname;
      const token = path.match(/\/reset-password\/(.+)/)[1];

      const response = await axios.post(url, {
        password,
        token,
      });

      console.log(response.data);
      alert(response.data.message);
      //navigate("/login")

      // Handle success
      // Redirect to success page or show success message
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Reset Password</h1>
            <input
              type="password"
              placeholder="New Password"
              name="password"
              value={password}
              onChange={handleChangePassword}
              required
              className={styles.input}
            />

            {error && <div className={styles.error_msg}>{error}</div>}

            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChangeConfirmPassword}
              required
              className={styles.input}
            />
            <p>
              click here to login? <Link to="/login">Login</Link>
            </p>
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
