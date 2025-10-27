import React from "react";
import { useForm } from "react-hook-form";
import GoogleLoginButton from "./GoogleLoginButton";
import { useLoginMutation } from "../../../Api/authApi";
import "./Login.css";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [login, { isLoading, error }] = useLoginMutation();

  const onSubmit = async (data) => {
    try {
      const response = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      // Save token to localStorage for further requests
      localStorage.setItem("smart-canteen-ordering-system", response.token);
      window.location.reload();

    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="login-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="decor-circle-1"></div>
        <div className="decor-circle-2"></div>
        <div className="samosa"></div>
        <div className="pizza">
          <div className="pizza-topping-1"></div>
          <div className="pizza-topping-2"></div>
        </div>
        <div className="burger">
          <div className="burger-lettuce"></div>
        </div>
        <h1 className="logo">nandha canteen</h1>
      </div>

      {/* Login Form Section */}
      <div className="form-section">
        <h2 className="title">
          #Eat smart<br />Save time
        </h2>

        <div className="form-container">
          <div className="divider">
            <div className="divider-line"></div>
            <span className="divider-text">Log in </span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Input */}
            <div className="input-container">
              <input
                type="email"
                placeholder="Enter Email"
                className="input-field"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <span className="error">{errors.email.message}</span>}
            </div>

            {/* Password Input */}
            <div className="input-container">
              <input
                type="password"
                placeholder="Enter Password"
                className="input-field"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && <span className="error">{errors.password.message}</span>}
            </div>

            {/* Login Button */}
            <button type="submit" className="login-button">Login</button>
          </form>

          {/* Divider */}
          <div className="divider">
            <div className="divider-line"></div>
            <span className="divider-text">or</span>
          </div>

          {/* Google Login */}
          <GoogleLoginButton />

          {/* Terms */}
          <div className="terms">
            By continuing, you agree to our<br />
            <span>Terms of Service</span>{" "}
            <span>Privacy Policy</span>{" "}
            <span>Content Policy</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
