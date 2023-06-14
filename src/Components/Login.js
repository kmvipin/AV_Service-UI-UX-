import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginStyles.css";
import { Link } from "react-router-dom";
import Signup from "./Signup";
import OTPVerification from './OTPVerification';

const Login = ({setShowNavForm}) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkedSeller, setCheckedSeller] = useState(false);
  const [checkedCustomer, setCheckedCustomer] = useState(false);
  const [flag, setFlag] = useState(true)
  const [errorMessage, displayLoginErrorMessage] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [signUpForm, setSignUpForm] = useState(false);

  useEffect(()=>{
    setShowForm(true);
    setCheckedCustomer(false);
    setCheckedSeller(false);
  },[flag])


  const loginHandler = (e) => {
    e.preventDefault();
    let body;
    if (checkedCustomer) {
      body = {
        email: email,
        pass: password,
        role: "CUSTOMER",
      };

      console.log(body, "d");
    } else if (checkedSeller) {
      body = {
        email: email,
        pass: password,
        role: "SELLER",
      };
    } else {
      //console.log("please select the category");
      return displayLoginErrorMessage("please select category")
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    fetch('http://127.0.0.1:8080/public/api/user_login', options)
      .then((response) => {
        return response.json()
      })
      .then((result) => {
        if (result.success === true) {
          sessionStorage.setItem("token", result.token);
          sessionStorage.setItem("role", result.role);
if(sessionStorage.getItem("role") == "SELLER"){
          setShowForm(false);
          return navigate("/sellerdashboard");
        }
          if(sessionStorage.getItem("role") == "CUSTOMER"){
            setShowForm(false);
            return navigate("/");
          }
        } else {
          setFlag(false);
          return displayLoginErrorMessage("Invalid User");
          //show error and refresh
        }
      })
      .catch((error) => {
        setFlag(false);
      console.log("error", error)
      return displayLoginErrorMessage(error);
    });
  };

  return (
    <>
    {signUpForm && <Signup/>}
    <div className="signup-modal" style={{ display: showForm ? "block" : "none" }}>
      <div className="form login">
      <span className="close-button" onClick={()=>{setShowForm(false); setShowNavForm(false)}}>&times;</span>
          <br/>
          <header className="signup-login-header">Login</header>
          <br/>
          {errorMessage && <div id="error-message">{errorMessage}</div>}
          
          <form onSubmit={loginHandler}>
            <div className="field input-field">
              <input
                id="loginEmail"
                type="email"
                value={email}
                placeholder="Email"
                className="input"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="field input-field">
              <input
                id="loginPass"
                type={showPassword ? 'text' : 'password'}
                value={password}
                placeholder="Password"
                className="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />

            <a
              type="button"
              className={`toggle-password ${showPassword ? 'show' : ''}`}
              onClick={() => setShowPassword(!showPassword)}
            ></a>
            
            </div>

            <div className="radioLogin">
              <label>
                <input
                  id="loginCustomer"
                  type="radio"
                  name="user"
                  value="CUSTOMER"
                  checked={checkedCustomer}
                  onChange={() => setCheckedCustomer(true)}
                />
                CUSTOMER
              </label>
              <label>
                <input
                  id="loginSeller"
                  type="radio"
                  name="user"
                  value="SELLER"
                  checked={checkedSeller}
                  onChange={() => setCheckedSeller(true)}
                />
                SELLER
              </label>
            </div>

            <div className="form-link">
              <Link to={'/otpverification'} onClick={()=>{setShowForm(false); setShowNavForm(false)}} className="forgot-pass">
                Forgot password?
              </Link>
            </div>

            <div className="field button-field">
              <button id="loginBtn" type="submit">
                Login
              </button>
            </div>
          </form>
          <div className="form-link">
            <span>
              Don't have an account?{" "}
              <Link onClick={()=>{setShowForm(false); setSignUpForm(true);}} className="link signup-link">
                Signup
              </Link>
            </span>
        </div>
      </div>
  </div> 
  </>
  );
};

export default Login;