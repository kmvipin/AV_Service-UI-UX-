import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginStyles.css";
import { Link } from "react-router-dom";
import Login from "./Login";
import axios from "axios";
import base_url from "../api/Service";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [firstPassword, setFirstPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkedSeller, setCheckedSeller] = useState(false);
  const [checkedCustomer, setCheckedCustomer] = useState(false);
  const [errorMessage, displaySignUpErrorMessage] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [loginForm, setLoginForm] = useState(false);

  const navigate = useNavigate();

  const SignupHandler = (e) => {
    e.preventDefault();
    let body;
    let url;
    if (firstPassword === confirmPassword) {
      if (checkedCustomer) {
        body = {
          person: {
            confirmEmail: email,
            confirmPwd: firstPassword,
            email: email,
            first_name: firstName,
            last_name: lastName,
            mobileNumber: phoneNumber,
            pwd: firstPassword,
          },
        };
        url = `${base_url}http://localhost:8080/public/api/newCustomer`;
      } else if (checkedSeller) {
        body = {
          person: {
            confirmEmail: email,
            confirmPwd: firstPassword,
            email: email,
            first_name: firstName,
            last_name: lastName,
            mobileNumber: phoneNumber,
            pwd: firstPassword,
          },
        };
        url = `${base_url}http://localhost:8080/public/api/newSeller`;
      } else {
        console.log("please select the category");
      }
      axios
        .post(url, body, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((response) => {
          const result = response.data;
          if (result.success) {
            sessionStorage.setItem("token", result.token);
            setShowForm(false);
            setLoginForm(true);
            return;
            // redirect to login page
          } else {
            // redirect to signUp or refresh
          }
        })
        .catch((error) => console.error(error));
    } else {
      displaySignUpErrorMessage(
        "Create Password and Confirm Password must be same"
      );
      return;
    }
  };
  return (
    <>
      {loginForm && <Login />}
      <div
        className="signup-modal"
        style={{ display: showForm ? "block" : "none" }}
      >
        <div className="form login">
          <span
            className="close-button"
            onClick={() => {
              setShowForm(false);
            }}
          >
            &times;
          </span>
          <div className="mainsignup">
            {/* <div className="form signup"> */}
            <header className="signup-login-header">Signup</header>
            <br />
            {errorMessage && <div id="error-message"> {errorMessage} </div>}
            <form onSubmit={SignupHandler}>
              <div className="field input-field">
                <label for="name" className="data">
                  Your First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  placeholder="Enter Your First Name"
                  className="input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <br />

              <div className="field input-field">
                <label for="name" className="data">
                  {" "}
                  Your Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  placeholder="Enter your last name"
                  className="input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <br />

              <div className="field input-field">
                <label for="Email" className="data">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <br />

              <div className="field input-field">
                <label for="phoneNumber" className="data">
                  Phone Number
                </label>
                <input
                  type="number"
                  id="phoneNumber"
                  placeholder="Enter your phoneNumber"
                  className="input"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <br />

              <div className="field input-field">
                <label for="password" className="data">
                  Create Password
                </label>
                <input
                  type="password"
                  id="pass"
                  placeholder="Enter password"
                  className="password"
                  value={firstPassword}
                  onChange={(e) => setFirstPassword(e.target.value)}
                  required
                />
              </div>
              <br />

              <div className="field input-field">
                <label for="password" className="data">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPass"
                  placeholder="Confirm password"
                  className="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <h2 className="h2tag">Are you a CUSTOMER or a SELLER</h2>
              <fieldset className="radioLogin">
                <label>
                  <input
                    id="customer"
                    type="radio"
                    value="CUSTOMER"
                    checked={checkedCustomer}
                    onChange={() => setCheckedCustomer(true)}
                  />
                  CUSTOMER
                </label>
                <label>
                  <input
                    id="seller"
                    type="radio"
                    value="SELLER"
                    checked={checkedSeller}
                    onChange={() => setCheckedSeller(true)}
                  />
                  SELLER
                </label>
              </fieldset>
              <br />

              <div className="field button-field">
                <button id="signupBtn" type="submit">
                  Signup
                </button>
              </div>
            </form>
            <div className="form-link">
              <span>
                Already have an account?{" "}
                <Link
                  onClick={() => {
                    setShowForm(false);
                    setLoginForm(true);
                  }}
                  className="link login-link"
                >
                  Login
                </Link>
              </span>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
