import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function GoogleLoginButton({ onSuccess }) {
  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("User Info:", decoded);
    
    if (onSuccess) {
      onSuccess(decoded);
    }
  };

  const handleError = () => {
    console.log("Login Failed");
    alert("Google Login Failed");
  };

  return (
    <div style={{display:"flex",justifyContent:"center",marginBottom:"clamp(1.5rem, 3vw, 2rem)"}} >
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