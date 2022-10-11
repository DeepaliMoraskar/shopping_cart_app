import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "./RegisterStyle.scss";

export default function Register(props) {
  return (
    <div>
      <div className="form-container">
        <form
          className="form-content"
          onSubmit={(e) => props.onSubmitClick(e, props.userDetails)}
        >
          <TextField
            id="standard-basic"
            label="First Name"
            variant="standard"
            className="text-field-style"
            required
            value={props.userDetails.firstName}
            onChange={(event) =>
              props.setUserDetails({
                ...props.userDetails,
                firstName: event.target.value,
              })
            }
          />
          <TextField
            id="standard-basic"
            label="Last Name"
            variant="standard"
            className="text-field-style"
            required
            value={props.userDetails.lastName}
            onChange={(event) =>
              props.setUserDetails({
                ...props.userDetails,
                lastName: event.target.value,
              })
            }
          />
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            className="text-field-style"
            required
            value={props.userDetails.email}
            onChange={(event) =>
              props.setUserDetails({
                ...props.userDetails,
                email: event.target.value,
              })
            }
          />
          <TextField
            id="standard-basic"
            label="Password"
            variant="standard"
            className="text-field-style"
            required
            value={props.userDetails.password}
            onChange={(event) =>
              props.setUserDetails({
                ...props.userDetails,
                password: event.target.value,
              })
            }
          />
          <TextField
            id="standard-basic"
            label="Confirm Password"
            variant="standard"
            className="text-field-style"
            required
            value={props.userDetails.confirmPwd}
            onChange={(event) =>
              props.setUserDetails({
                ...props.userDetails,
                confirmPwd: event.target.value,
              })
            }
          />
          <p
            style={{
              color: props.validation.statusErrorMessage ? "red" : "green",
              textAlign: "center",
            }}
          >
            {props.validation.statusErrorMessage ||
              props.validation.statusSuccessMessage}
          </p>
          <Button
            variant="contained"
            type="submit"
            className="text-field-style bottom-style"
            disabled={
              !(
                props.userDetails.firstName &&
                props.userDetails.email &&
                props.userDetails.password &&
                props.userDetails.confirmPwd
              )
            }
          >
            Signup
          </Button>
        </form>
      </div>
    </div>
  );
}
