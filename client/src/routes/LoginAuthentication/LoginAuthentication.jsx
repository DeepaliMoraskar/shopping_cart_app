import React, { useState } from "react";
import Login from "../../components/Login/Login";
import "./LoginAuthenticationStyle.scss";
import { useNavigate } from "react-router-dom";

export default function LoginAuthentication() {
  const navigate = useNavigate();
  const initialState = {
    email: "",
    password: "",
  };
  const [userDetails, setUserDetails] = useState(initialState);
  const [validation, setValidation] = useState("");

  const onFormSubmit = (e) => {
    e.preventDefault();
    const email = sessionStorage.getItem("email");
    const pwd = sessionStorage.getItem("password");
    if (userDetails.email === email && userDetails.password === pwd) {
      sessionStorage.setItem("status", "logged-in");
      navigate("/");
    } else {
      setValidation("Invalid credentials");
    }
  };

  return (
    <div className="login-Auth-container">
      <div className="login-container">
        <div className="login-desc-container text-content">
          <h1 className="Login-Auth-Text-Style">Login</h1>
          <p className="Login-Auth-Text-Style">
            Get access to your Orders, Wishlist and Recommendation
          </p>
        </div>
        <div className="login-authform-container">
          <Login
            onSubmitClick={onFormSubmit}
            validation={validation}
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            setValidation={setValidation}
          />
        </div>
      </div>
    </div>
  );
}
