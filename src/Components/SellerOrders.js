import React, { useEffect, useState } from "react";
import "./SellerOrdersStyles.css";
import { useNavigate } from "react-router-dom";
import SellerNavbar from "./SellerNavbar";
import base_url from "../api/Service";
import axios from "axios";
const SellerOrders = () => {
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();

  function updateAction(id) {
    console.log("Close Order");
  }

  function displayOrders() {
    const token = sessionStorage.getItem("token");

    axios
      .get(`${base_url}/api/seller/getSellerBooking`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 401) {
          return navigate("/login");
        }
        return response.data;
      })
      .then((data) => {
        setOrder(data);
      })
      .catch((error) => {
        console.error("Something went wrong");
      });
  }
  useEffect(() => {
    displayOrders();
  }, []);

  return (
    <>
      <SellerNavbar />
      <div>
        <h3 className="my-order-heading">My Orders</h3>

        <div className="table-container">
          <table id="order-table">
            <thead>
              <tr>
                <th>Order Name</th>
                <th>Amount</th>
                <th>Billing Name</th>
                <th>Order Date</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
              {order.map((item) => (
                <tr key={item.id}>
                  <td>{item.service.service_name}</td>
                  <td>{item.amount}</td>
                  <td>
                    {item.person.first_name + " " + item.person.last_name}
                  </td>
                  <td>{`${item.order.booked_date[2]}/${item.order.booked_date[1]}/${item.order.booked_date[0]}`}</td>
                  <td>{`${item.person.address.address1}, ${item.person.address.address2}, ${item.person.address.city}, ${item.person.address.state}, ${item.person.address.zipCode}`}</td>
                  <td>{item.person.mobileNumber}</td>
                  <td>{item.status}</td>
                  <td>
                    <button onClick={updateAction(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </thead>
            <tbody id="order-rows"></tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SellerOrders;
