import React from "react";
import { useEffect } from "react";
import { FaEnvelope, FaMapMarker, FaPhone } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import styles from "./SellerDashboardStyles.module.css";
import SellerNavbar from "./SellerNavbar";

const SellerDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      sessionStorage.getItem("token") === null ||
      sessionStorage.getItem("role") !== "SELLER"
    ) {
      return navigate("/");
    }
  }, []);

  return (
    <div>
      <SellerNavbar />

      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <p>
          A seller dashboard is a web-based interface that allows sellers to
          manage and monitor their online store or business. Some common
          features of a seller dashboard should include profile, My-services,
          description about seller dashboard.
        </p>
      </div>

      <h1 className={styles.intro}>Welcome To The Seller Dashboard</h1>
      <div className={styles["btn-lg-div"]}>
        <button
          className={styles["btn-lg"]}
          onClick={() => navigate("/profile")}
        >
          Profile
        </button>
        <button
          className={styles["btn-lg"]}
          id={styles["goto-service-page"]}
          onClick={() => navigate("/sellerservice")}
        >
          Services
        </button>
        <button
          className={styles["btn-lg"]}
          id={styles["my-orders"]}
          onClick={() => navigate("/sellerorder")}
        >
          My Orders
        </button>
      </div>

      <footer>
        <div className={styles.sellerfooter}>
          <div>
            <h4>Contact Us</h4>
            <ul>
              <li>
                <i>
                  <FaMapMarker />
                </i>
                123 Main St, GZB
              </li>
              <li>
                <i>
                  <FaPhone />
                </i>
                8826077062
              </li>
              <li></li>
            </ul>
          </div>

          <div>
            <h4>
              <a href="mailto:imaadi2509@gmail.com">
                <i>
                  <FaEnvelope />
                </i>
              </a>{" "}
              Mail Us
            </h4>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SellerDashboard;
