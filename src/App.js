import React from "react";

import ServiceDetails from "./Components/ServiceDetails";
// import Booking from "./Components/Booking";
import Service from "./Components/Service";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { Routes, Route } from "react-router-dom";
import Profile from "./Components/Profile";
import AddServices from "./Components/AddServices";
import SellerServices from "./Components/SellerServices";
import SellerOrders from "./Components/SellerOrders";
import SellerDashboard from "./Components/SellerDashboard";
import HomeContainer from "./Container/HomeContainer";
import CustomerCart from "./Components/CustomerCart";
import OTPVerification from "./Components/OTPVerification";

const App = () => {
  return (
    <Routes>
      {/* <Route path="/booking" element={<Booking />} /> */}
{/* public */}
      <Route path="/" element={<HomeContainer />} />
      <Route path="/services" element={<Service />} />
      <Route path="/serviceDetails" element={<ServiceDetails/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/otpverification" element={<OTPVerification/>}/>
{/* session */}

      <Route path="/profile" element={<auth><Profile /></auth>} />
      {/* seller */}
      <Route path="/addservice" element={<auth><AddServices /></auth>} />
      <Route path="sellerservice" element={<auth><SellerServices /></auth>} />
      <Route path="/sellerorder" element={<auth><SellerOrders /></auth>} />
      <Route path="/sellerdashboard" element={<auth><SellerDashboard /></auth>} />

      {/*customer*/}
      <Route path="/customercart" element = {<auth><CustomerCart/></auth>} />
      
    </Routes>
    // <Home />
  );
};

export default App;