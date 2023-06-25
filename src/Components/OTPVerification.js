import React, { useState } from "react";
import styles from "./OTPVerificationStyles.module.css"; // Import the CSS module
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import base_url from "../api/Service";

const PhoneNumberVerificationPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOTP] = useState("");
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleOTPChange = (event) => {
    setOTP(event.target.value);
  };

  const handleNewPassChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPassChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const sendOtp = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${base_url}/public/api/sendOTP?phoneNumber=${phoneNumber}`,
        {},
        {
          headers: {
            Accept: "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success("OTP sent Successfully");
      } else {
        toast.error("Could not be able to send OTP");
      }
    } catch (error) {
      toast.error("Something Went Wrong, Please Try Again!!");
      console.error("Error:", error);
    }
  };

  const handleVerifyOTP = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `${base_url}/public/api/verifyOTP?otp=${otp}&phoneNumber=${phoneNumber}`,
        {
          headers: {
            Accept: "application/json",
          },
          withCredentials: true,
        }
      );

      const result = response.data;
      if (result.success === false) {
        toast.error(<h3>Invalid OTP</h3>);
        throw new Error("Wrong OTP");
      }

      toast.success("Successfully Verified");
      setIsOTPVerified(true);
    } catch (error) {
      console.log("Error:", error);
    }
    console.log(`Verifying OTP: ${otp}`);
  };

  const handleChangePass = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${base_url}/public/api/changePass?otp=${otp}&phoneNumber=${phoneNumber}&newPass=${newPassword}&confirmPass=${confirmPassword}`,
        {},
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        }
      );

      if (!response.data.success) {
        toast.error("Something Went Wrong");
        return;
      }
      navigate("/");
      toast.success("Password Change Successfully");
      return;
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      {/* <h1>Phone Number Verification</h1> */}
      <form>
        <div className={styles.formGroup}>
          <label htmlFor="phone">Enter Phone Number:</label>
          <input
            type="text"
            id="phone"
            className={styles.formControl}
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            disabled={isOTPVerified}
          />
        </div>
        {!isOTPVerified && (
          <button className={styles.btnPrimary} onClick={sendOtp}>
            Get OTP
          </button>
        )}
        <div className={styles.formGroup}>
          <label htmlFor="otp">Enter OTP:</label>
          <input
            type="text"
            id="otp"
            className={styles.formControl}
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOTPChange}
            disabled={isOTPVerified}
          />
        </div>
        {!isOTPVerified && (
          <button
            className={styles.btnPrimary}
            onClick={handleVerifyOTP}
            disabled={isOTPVerified}
          >
            Verify
          </button>
        )}
        <div className={styles.formGroup}>
          <label htmlFor="password">Enter New-PassWord:</label>
          <input
            type="text"
            id="password"
            className={styles.formControl}
            placeholder="New Password"
            value={newPassword}
            onChange={handleNewPassChange}
            disabled={!isOTPVerified}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirm-password">Enter Confirm-PassWord:</label>
          <input
            type="text"
            id="confirm-password"
            className={styles.formControl}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPassChange}
            disabled={!isOTPVerified}
          />
        </div>
        {isOTPVerified && (
          <button className={styles.btnPrimary} onClick={handleChangePass}>
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default PhoneNumberVerificationPage;
