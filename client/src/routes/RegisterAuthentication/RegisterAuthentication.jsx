import React, { useState } from "react";
import Register from "../../components/Register/Register";
import { useNavigate } from "react-router-dom";
import "./RegisterAuth.scss";

export default function RegisterAuthentication() {
  const navigate = useNavigate();
  const intialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPwd: "",
  };
  const [userDetails, setUserDetails] = useState(intialState);
  const [validation, setValidation] = useState({
    statusErrorMessage: "",
    statusSuccessMessage: "",
  });

  const onFormSubmit = (e, userDetails) => {
    e.preventDefault();
    const emailReg = /\S+@\S+\.\S+/;
    const pwdReg =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (userDetails.firstName && userDetails.email && userDetails.password) {
      if (userDetails.password === userDetails.confirmPwd) {
        if (pwdReg.test(userDetails.password)) {
          if (emailReg.test(userDetails.email)) {
            sessionStorage.setItem(
              "name",
              userDetails.firstName + " " + userDetails.lastName
            );
            sessionStorage.setItem("email", userDetails.email);
            sessionStorage.setItem("password", userDetails.password);
            sessionStorage.setItem("status", "");
            setValidation({
              ...validation,
              statusSuccessMessage: "User registered successfully",
              statusErrorMessage: "",
            });
            setUserDetails(intialState);
            setTimeout(() => navigate("/login"), 2000);
          } else {
            showError("Invalid email id");
          }
        } else {
          showError(
            "Password must contain minimum eight characters, at least one letter, one number and one special character"
          );
        }
      } else {
        showError("Passwords do not match");
      }
    } else {
      showError("Please provide First name, Email & Password");
    }
  };

  const showError = (msg) => {
    setValidation({
      ...validation,
      statusErrorMessage: msg,
    });
  };

  return (
    <div className="register-Auth-container">
      <div className="register-container">
        <div className="register-desc-container text-content">
          <h1 className="register-Auth-Text-Style">Sign Up</h1>
          <p className="register-Auth-Text-Style">
            We do not share your personal details with anyone
          </p>
        </div>
        <div className="register-form-container">
          <Register
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
