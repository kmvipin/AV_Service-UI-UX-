import React, { useState } from 'react';
import styles from './OTPVerificationStyles.module.css'; // Import the CSS module
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const PhoneNumberVerificationPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOTP] = useState('');
  const [realOTP,setRealOTP] = useState('');
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [currentEmail, setCurrentEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  const sendOtp=async(event)=>{
    event.preventDefault();
  //   fetch("http://localhost:8080/public/api/sendOTP?phoneNumber="+phoneNumber+"&email="+currentEmail, {
  //     method: 'POST',
  //     headers: {
  //       "Accept" : "application/json"
  //     },
  //   })
  // .then(response => {
  //   if(response.ok){
  //     //sessionStorage.setItem("cookie",)
  //     console.log(response);
  //     console.log(response.headers['set-cookie']);
  //     toast.success("OTP sent Successfully");
  //   }
  //   else{
  //     toast.error("Could not be able to send OTP");
  //   }
  // })
  // .catch(error => console.log('error', error));

  try {
    const response = await axios.post(
      `http://localhost:8080/public/api/sendOTP?phoneNumber=${phoneNumber}`,
      {},
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );
    console.log(response);
    console.log(response.data.success);
    if (response.data.success) {
      setRealOTP(response.data.message);
      console.log(response);
      console.log(response.headers['set-cookie']);
      toast.success('OTP sent Successfully');
    } else {
      toast.error('Could not be able to send OTP');
    }
  } catch (error) {
    toast.error('Something Went Wrong, Please Try Again!!');
    console.error('Error:', error);
  }
}
// const handleGetOTP = async (event) => {
//     // Perform action to get OTP
//     event.preventDefault();
//     if(phoneNumber === ''){
//       toast.error("Phone Number Is Empty");
//       return;
//     }

//   //   fetch("http://localhost:8080/public/api/getEmailByPhone?phoneNumber="+phoneNumber, {
//   //     method: 'GET',
//   //     headers : {
//   //       "Accept" : "application/json",
//   //     }
//   //   })
//   // .then(response => {
//   //   if(!response.ok){
//   //     toast.error("Phone Number Is NOt Exists");
//   //     throw new Error("Somethig went wrong");
//   //   }
//   //   console.log(response);
//   //   return response.json();
//   // })
//   // .then(result =>{
//   //   setCurrentEmail(result.email);
//   // })
//   // .then(sendOtp)
//   // .catch(error => console.log('error', error));
//   try {
//     const response = await axios.get(`http://localhost:8080/public/api/getEmailByPhone?phoneNumber=${phoneNumber}`, {
//       headers: {
//         'Accept': 'application/json',
//       },
//     });

//     if (!response.data) {
//       throw new Error('Phone Number Does Not Exist');
//     }

//     const { email } = response.data;
//     setCurrentEmail(email);
//     sendOtp();
//   } catch (error) {
//     console.log('Error:', error);
//   }
//     console.log(`Getting OTP for ${phoneNumber}`);
// };

  const handleVerifyOTP = async (event) => {
    event.preventDefault();
    //console.log("JSESSIONID="+Cookies.get("JSESSIONID"));
    // fetch("http://localhost:8080/public/api/verifyOTP?otp="+otp+"&email=vk783838@gmail.com", {
    //   method: 'GET',
    //   headers: {
    //     "Accept" : "application/json",
    //     "Connection" : "keep-alive",
    //     "Cookie" : "JSESSIONID=17A8E017EE10849CE9B09B55299755E1; Path=/; HttpOnly"
    //   }
    // })
    // .then(response => {
    //   return response.json();
    // })
    // .then(result => {
    //   if(result.success === false){
    //     toast.error(<h3>Invalid OTP</h3>);
    //     throw new Error("Wrong OTP");
    //   }
    //   toast.success("Successfully Verified");
    //   setIsOTPVerified(true);
    // })
    // .catch(error => console.log('error', error));
    // try {
    //   const response = await axios.get(
    //     `http://localhost:8080/public/api/verifyOTP?otp=${otp}&email=${currentEmail}`,
    //     {
    //       headers: {
    //         'Accept': 'application/json'
    //       },
    //     }
    //   );

    //   const result = response.data;
    //   if (result.success === false) {
    //     toast.error(<h3>Invalid OTP</h3>);
    //     throw new Error('Wrong OTP');
    //   }

    //   toast.success('Successfully Verified');
    //   setIsOTPVerified(true);
    // } catch (error) {
    //   console.log('Error:', error);
    // }
    // console.log(`Verifying OTP: ${otp}`);

    if(otp === realOTP){
      setIsOTPVerified(true);
    }
};

const handleChangePass = async (e) =>{
  e.preventDefault();
  try{
    const response = await axios.post(
      `http://localhost:8080/public/api/changePass?otp=${otp}&phoneNumber=${phoneNumber}&newPass=${newPassword}&confirmPass=${confirmPassword}`,
      {
        headers: {
          'Accept': 'application/json'
        },
      }
    );

    if(!response.data.success){
      toast.error("Something Went Wrong");
      return;
    }
    navigate('/');
    toast.success("Password Change Successfully");
    return;
  }
  catch (error) {
    console.log('Error:', error);
  }
};

  return (
    <div className={styles.container}>
    <ToastContainer/>
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
            disabled = {isOTPVerified}
          />
        </div>
        {!isOTPVerified && <button className={styles.btnPrimary} onClick={sendOtp}>
          Get OTP
        </button>}
        <div className={styles.formGroup}>
          <label htmlFor="otp">Enter OTP:</label>
          <input
            type="text"
            id="otp"
            className={styles.formControl}
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOTPChange}
            disabled = {isOTPVerified}
          />
        </div>
        {!isOTPVerified && <button className={styles.btnPrimary} onClick={handleVerifyOTP} disabled = {isOTPVerified}>
          Verify
        </button>}
        <div className={styles.formGroup}>
          <label htmlFor="password">Enter New-PassWord:</label>
          <input
            type="text"
            id="password"
            className={styles.formControl}
            placeholder="New Password"
            value={newPassword}
            onChange={handleNewPassChange}
            disabled = {!isOTPVerified}
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
            disabled = {!isOTPVerified}
          />
        </div>
        {isOTPVerified && <button className={styles.btnPrimary} onClick={handleChangePass}>
          Submit
        </button>}
      </form>
    </div>
  );
};

export default PhoneNumberVerificationPage;
