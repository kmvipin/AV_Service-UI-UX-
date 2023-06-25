import React, { useState } from "react";
import "./AddServicesStyles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import base_url from "../api/Service";
const AddServices = ({ setShowAddServiceForm }) => {
  const [serviceName, setServiceName] = useState("");
  const [unit, setUnit] = useState("");
  const [categoryName, setCategoryName] = useState("Electrician");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  function addService(e) {
    e.preventDefault();
    const token = sessionStorage.getItem("token");

    console.log(serviceName, unit, categoryName, msg);
    axios
      .post(
        `${base_url}/api/service/addService`,
        {
          service_name: serviceName,
          unit_price: parseInt(unit),
          image: null,
          category_name: categoryName,
          message: msg,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.status === 401) {
          return navigate("/login");
        }
        return response.data;
      })
      .then((data) => {
        setShowAddServiceForm(false);
      })
      .catch((error) => console.error(error));
  }
  console.log(serviceName, unit, msg, categoryName, "dfdf");

  return (
    <>
      <div className="add-service-modal" style={{ display: "block" }}>
        <form className="addform">
          <span
            className="close-button"
            onClick={() => {
              setShowAddServiceForm(false);
            }}
          >
            &times;
          </span>
          <h2 className="addheading">Add Your Service</h2>
          <label for="cars">Choose Your Category:</label>
          <select
            id="category"
            name="category"
            onChange={(e) => setCategoryName(e.target.value)}
          >
            <option value="Electrician">Electrician</option>
            <option value="Plumber">Plumber</option>
            <option value="Laptop">Laptop</option>
            <option value="Refrigator">Refrigator</option>
            <option value="Washing Machine">Washing Machine</option>
            <option value="Television">Television</option>
            <option value="AC">AC</option>
            <option value="Carpenter">Carpenter</option>
            <option value="Mechanic">Mechanic</option>
          </select>
          <label for="service-name">Service Name:</label>
          <input
            type="text"
            id="service-name"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            required
          ></input>

          <label for="service-description">Description:</label>
          <textarea
            id="service-description"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            required
          ></textarea>

          <label for="service-price">Price:</label>
          <input
            type="text"
            id="service-price"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            required
          ></input>

          {/* <label for="service-images">Images:</label>
            <input type="file" id="service-images" accept="image/*" multiple></input> */}

          <button type="submit" onClick={addService}>
            Add Service
          </button>
        </form>

        <div id="image-preview"></div>
      </div>
    </>
    //</div>
  );
};

export default AddServices;
