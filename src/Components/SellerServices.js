import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SellerServices.module.css";
import SellerNavbar from "./SellerNavbar";
import logodetail from "../Assets/carpenter.png";
import AddServices from "./AddServices";
import ACImage from "../Assets/AC.png";
import axios from "axios";
import base_url from "../api/Service";

const SellerServices = () => {
  const [showAddServiceForm, setShowAddServiceForm] = useState(false);
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const handleShowFormChange = (value) => {
    setShowAddServiceForm(value);
  };
  const handleRemove = (id) => {
    var token = sessionStorage.getItem("token");
    if (token == null) {
      //return
    }

    axios
      .delete(`${base_url}/api/service/removeService?service_id=${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          const updatedData = data.filter((item) => item.service_id !== id);
          setData(updatedData);
          // show success message
          return navigate("/sellerservice");
        } else if (response.status === 401) {
          // return navigate('/login');
          // show error to login
        } else if (response.status === 404) {
          // show error service not found
        } else {
          // show error page something went wrong
        }
      })
      .catch((error) => console.error(error));
      console.error("Something Went Wrong");
  };
  function displayServices() {
    var token = sessionStorage.getItem("token");
    if (token == null) {
      //return navigate('/login');
    }

    axios
      .get(`${base_url}/api/seller/getServices`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 401) {
          throw new Error("401");
        }
        return response.data;
      })
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        if (error.message === "401") {
          throw new Error("Something Went Wrong");
        }
        console.log("Something went Wrong");
      });
  }

  useEffect(() => {
    displayServices();
  }, []);
  return (
    <>
      <SellerNavbar />
      {showAddServiceForm && (
        <AddServices setShowAddServiceForm={handleShowFormChange} />
      )}
      <div className={styles.serheader}>
        <button
          onClick={() => setShowAddServiceForm(!showAddServiceForm)}
          className={styles.serbtn}
          id="load-btn"
        >
          Add new service{" "}
          <img src="https://www.htmlcssbuttongenerator.com/iconExample-plus-square-multiple-lined.svg" />
        </button>
      </div>
      <div>
        <div className={styles.services}>
          {data.map((data) => (
            <div className={styles.service} key={data.service_id}>
              {data.category_name === "AC" ? (
                <img
                  src={ACImage}
                  alt={data.service_name}
                  className={styles["service-image"]}
                />
              ) : (
                <img
                  src={logodetail}
                  alt={data.service_name}
                  className={styles["service-image"]}
                />
              )}

              <h2 className={styles["service-name"]}>{data.service_name}</h2>
              <p className={styles.description}>{data.message}</p>
              <p className={styles.cost}>{data.unit_price} Rs.</p>
              <button
                className={styles["remove-button"]}
                onClick={() => handleRemove(data.service_id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* <nav>
        <ul>
            <li><a href="#">My services</a></li>

        </ul>
        </nav> */}
    </>
  );
};

export default SellerServices;
