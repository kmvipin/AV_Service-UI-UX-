import React from "react";
import "./SellerNavbar.css";
import axios from "axios";
import base_url from "../api/Service";
import {
  // useNavigate,
  Link,
  json,
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
const SellerNavbar = () => {
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");
  const logoutHandler = () => {
    axios
      .post(`${base_url}/api/person/logout`, null, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.status, "dfdf");
        if (response.status === 201 || response.status === 200) {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("role");
          return navigate("/");
        }
      })
      .catch((error) => console.error(error));
  };
  return (
    <header className="contain">
      <Link
        to={role === "CUSTOMER" ? "/" : "/sellerdashboard"}
        className="logo"
      >
        av<span>Service</span>
      </Link>
      <a className="menu fas fa-bars"></a>
      <nav className="navbar bg-color-dark">
        <Link onClick={logoutHandler}>logout</Link>
      </nav>
    </header>
  );
};

export default SellerNavbar;
