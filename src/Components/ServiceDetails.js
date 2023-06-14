import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import styles from "./ServiceDetailsStyles.module.css";
import logodetail from "../Assets/AC.png";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "./HomeComponent/NavBar";
import arrowImage from '../Assets/arrow.png';
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

  const navigate = useNavigate();
  const bookService = async (obj) => {
    let token = sessionStorage.getItem("token");
    let Username;
    let Usercontact;
    let UserEmail;
    if (token == null) {
      navigate("/login");
    }
    else{
      token = "Bearer "+token;
      console.log(Cookies.get('JSESSIONID'));
      await fetch('http://localhost:8080/api/person/getPerson', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Accept' : 'application/json',
          'Cookie' : 'JSESSIONID='+Cookies.get('JSESSIONID'),
          'Authorization': token,
        },
      })
        .then((response) => {
          console.log(response);
          if (response.status === 401) {
            navigate("/login");
            return;
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          Usercontact = data.mobileNumber;
          Username = data.name;
          UserEmail = data.email;
          console.log(Usercontact);
          fetch(
            'http://localhost:8080/api/order/create_order?amount='+obj.unit_price,
            {
              method: 'POST',
              headers: {
                'Authorization': token,
                'Content-type': 'application/json',
              },
            }
          )
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              console.log(data);
              let options = {
                key_id: "rzp_test_PuP7Zb9GOv2EPt",
                amount: data.amount,
                currency: data.currency,
                name: "AV Service",
                description: "Service : " + obj.service_name,
                image: "",
                order_id: data.id,
                handler: function (response) {
                  fetch('http://localhost:8080/api/order/bookService', {
                    method: 'POST',
                    headers: {
                      'Authorization': token,
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      amount: response.amount,
                      payment_method: response.method,
                      order: {
                        service: {
                          service_id: service.service_id,
                        },
                      },
                      razorpayPaymentId: response.razorpay_payment_id,
                      razorpayOrderId: response.razorpay_order_id,
                      razorpaySignature: response.razorpay_signature
                    })
                  })
                    .then(function (response) {
                      return response.json();
                    })
                    .then(function (data) {
                      //show success message
                     return navigate("/");
                    });
                },
                prefill: {
                  name: Username,
                  email: UserEmail,
                  contact: Usercontact,
                },
              };
              console.log("askdjgbkajrg");
              const razorpay = new window.Razorpay(options);
              razorpay.open();
            })
            .catch(function (error) {
              // navigate("/services");
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const getAllServicesByCategory = () => {
    console.log(service.id, "df00");
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "JSESSIONID=675DFA16B658889C30E24458CA8FA34B");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `http://localhost:8080/public/api/getAllServicesByCategory?category=${service.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setData(result);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getAllServicesByCategory();
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  },[]);
  return (
  <div className={styles.background}>
    <NavBar/>
    <br/><br/>
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <div className={styles.headerContent}>
          <p className={styles.appSubtitle}>Find the Best Services Near You</p>
        </div>
      </header>
    <div>
    <br/><br/>
    <div className={styles.productList}>
      <div className={styles.serviceContainer}>
        {data.map((obj) => (
          <div key={obj.id} className={styles.serviceCard}>
            <img src={logodetail} className={styles.serviceImage} />
            <h3 className={styles.serviceName}>{obj.service_name}</h3>
            <p>{obj.message}</p>
            <p className={styles.unitPrice}>{obj.unit_price} Rs.</p>
            <button className={styles.bookNowBtn} onClick={()=>{bookService(obj)}}>Book Now</button>
          </div>
        ))}
      </div>
    </div>
    </div>
    <Link to='/services' className={styles.backButton}>
    <img src={arrowImage} className={styles.backButtonImage} alt="Back" />
      </Link>
    </div>
  </div>
  );
};
export default ServiceDetails;

