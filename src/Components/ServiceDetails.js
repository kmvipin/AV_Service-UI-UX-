import React, { useEffect, useState } from "react";
import { Link, json } from "react-router-dom";
import styles from "./ServiceDetailsStyles.module.css";
import logodetail from "../Assets/AC.png";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "./HomeComponent/NavBar";
import arrowImage from "../Assets/arrow.png";
import axios from "axios";
import base_url from "../api/Service";
const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};
const ServiceDetails = () => {
  const location = useLocation();
  const { service } = location.state;

  const [data, setData] = useState([]);
  var createOrderData;

  const navigate = useNavigate();
  const bookService = async (obj) => {
    let token = sessionStorage.getItem("token");
    let Username;
    let Usercontact;
    let UserEmail;
    if (token == null) {
      navigate("/login");
    } else {
      token = "Bearer " + token;
      try {
        await axios
          .get(`${base_url}/api/person/getPerson`, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: token,
            },
            withCredentials: true,
          })
          .then((personResponse) => {
            if (personResponse.status === 401) {
              navigate("/login");
              throw new Error("Unauthorized");
            }
            return personResponse.data;
          })
          .then((personData) => {
            Usercontact = personData.mobileNumber;
            Username = personData.name;
            UserEmail = personData.email;
          })
          .catch((err) => {
            console.log(err);
            return;
          });

        await axios
          .post(
            `${base_url}/api/order/create_order?amount=${obj.unit_price}`,
            {},
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: token,
              },
              withCredentials: true,
            }
          )
          .then((createOrderResponse) => {
            if (createOrderResponse.status !== 200) {
              throw new Error("Something went wrong");
            }
            createOrderData = createOrderResponse.data;
          })
          .catch((err) => {
            console.log(err);
            return;
          });

        const options = {
          key_id: "rzp_test_PuP7Zb9GOv2EPt",
          amount: createOrderData.amount,
          currency: createOrderData.currency,
          name: "AV Service",
          description: "Service : " + obj.service_name,
          image: "",
          order_id: createOrderData.id,
          handler: function(response) {
            axios
              .post(
                `${base_url}/api/order/bookService`,
                {
                  amount: response.amount,
                  payment_method: response.method,
                  order: {
                    service: {
                      service_id: service.service_id,
                    },
                  },
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpaySignature: response.razorpay_signature,
                },
                {
                  headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                  },
                  withCredentials: true,
                }
              )
              .then(function(response) {
                return response.json();
              })
              .then(function(data) {
                // show success message
                return navigate("/");
              });
          },
          prefill: {
            name: Username,
            email: UserEmail,
            contact: Usercontact,
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getAllServicesByCategory = () => {
    axios
      .get(
        `${base_url}/public/api/getAllServicesByCategory?category=${service.id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getAllServicesByCategory();
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);
  return (
    <div className={styles.background}>
      <NavBar />
      <br />
      <br />
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <div className={styles.headerContent}>
            <p className={styles.appSubtitle}>
              Find the Best Services Near You
            </p>
          </div>
        </header>
        <div>
          <br />
          <br />
          <div className={styles.productList}>
            <div className={styles.serviceContainer}>
              {data.map((obj) => (
                <div key={obj.id} className={styles.serviceCard}>
                  <img src={logodetail} className={styles.serviceImage} />
                  <h3 className={styles.serviceName}>{obj.service_name}</h3>
                  <p>{obj.message}</p>
                  <p className={styles.unitPrice}>{obj.unit_price} Rs.</p>
                  <button
                    className={styles.bookNowBtn}
                    onClick={() => {
                      bookService(obj);
                    }}
                  >
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Link to="/services" className={styles.backButton}>
          <img src={arrowImage} className={styles.backButtonImage} alt="Back" />
        </Link>
      </div>
    </div>
  );
};
export default ServiceDetails;
