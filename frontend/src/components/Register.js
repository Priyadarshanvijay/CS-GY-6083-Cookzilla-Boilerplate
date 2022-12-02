import React, { useEffect, useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { Navigate } from 'react-router-dom';
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 2 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 2 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 3 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 3 and 40 characters.
      </div>
    );
  }
};

const vFName = (value) => {
  if (value.length < 2 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        First Name must be between 2 and 40 characters.
      </div>
    );
  }
};

const vLName = (value) => {
  if (value.length < 2 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Last Name must be between 2 and 40 characters.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profile, setProfile] = useState("");

  const onChangeUsername = (e) => {
    const userName = e.target.value;
    setUsername(userName);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeFName = (e) => {
    const fName = e.target.value;
    setFirstName(fName);
  };

  const onChangeLName = (e) => {
    const lName = e.target.value;
    setLastName(lName);
  };

  const onChangeProfile = (e) => {
    const p = e.target.value;
    setProfile(p);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(userName, 
        password, 
        firstName, 
        lastName,
        email, 
        profile).then(
        (response) => {
          setMessage(response.data.message || "Success");
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.error &&
              error.response.data.error.info) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  if(AuthService.getCurrentUser()) {
    return <Navigate to="/profile" replace={true} />
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={userName}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <Input
                  type="firstName"
                  className="form-control"
                  name="firstName"
                  value={firstName}
                  onChange={onChangeFName}
                  validations={[required, vFName]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <Input
                  type="lastName"
                  className="form-control"
                  name="lastName"
                  value={lastName}
                  onChange={onChangeLName}
                  validations={[required, vLName]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="profile">Profile</label>
                <Input
                  type="profile"
                  className="form-control"
                  name="profile"
                  value={profile}
                  onChange={onChangeProfile}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;
