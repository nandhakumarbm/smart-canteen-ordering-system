import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useLoginMutation } from "../../../Api/authApi";


function GoogleLoginButton({ onSuccess }) {
  const [login, { isLoading, error }] = useLoginMutation();

  const handleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);

    try {
      const response = await login({
        email: decoded.email,
        type: "googlelogin",
      });
      // Save token to localStorage for further requests
      localStorage.setItem("smart-canteen-ordering-system", response.data.token);

      window.location.reload();

    } catch (err) {
      console.error("Login error:", err);
    }


    if (onSuccess) {
      onSuccess(decoded);
    }
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: "clamp(1.5rem, 3vw, 2rem)" }} >
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        theme="outline"
        size="large"
        text="continue_with"
        shape="rectangular"
      />
    </div>
  );
}

export default GoogleLoginButton;