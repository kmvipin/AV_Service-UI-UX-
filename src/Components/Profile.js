import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./HomeComponent/NavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import styles from "./ProfileStyles.module.css";
import { FaUser } from "react-icons/fa";
import SellerNavbar from "./SellerNavbar";
import base_url from "../api/Service";

const Profile = () => {
  const [profileImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const role = sessionStorage.getItem("role");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");
  const navigate = useNavigate();
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
    setImage(event.target.files[0]);
  };

  function handleImageClick(flag) {
    console.log(flag);
    setShowDropdown(flag);
  }

  const handleOpenDirectory = () => {
    document.getElementById("fileInput").click();
  };

  const backHandler = () => {
    if (role === "SELLER") {
      return navigate("/sellerdashboard");
    }
    if (role === "CUSTOMER") {
      return navigate("/");
    }
  };
  const deleteImage = async () => {
    setImage(null);
    setSelectedImage(null);
    const token = sessionStorage.getItem("token");
    if (token === null) {
      toast.error("Something Went Wrong");
      return;
    }
    axios
      .delete(`${base_url}/api/person/deleteImage`, {
        headers: {
          Authorization: "Bearer " + token,
        },
        withCredentials: true,
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error();
        }
      })
      .catch((err) => {
        toast.error("Could Not Be Able to Delete");
        console.log(err);
      });
  };
  const getProfileImage = async () => {
    const token = sessionStorage.getItem("token");
    if (token === null) {
      toast.error("Login Again");
    }

    await axios
      .get(`${base_url}/api/person/requestImage`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/octet-stream",
        },
        withCredentials: true,
        responseType: "blob",
      })
      .then((response) => {
        if (response.status === 200) {
          const objectURL = URL.createObjectURL(response.data);
          setSelectedImage(objectURL);
        } else {
          throw new Error("Image request failed");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const getDetails = async () => {
    try {
      const url = `${base_url}/api/person/getPerson`;
      const token = sessionStorage.getItem("token");
      if (token === null) {
        navigate("/login");
        return;
      }
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
        withCredentials: true,
      });
      if (response.status !== 200) {
        navigate("./Login");
        return;
      }
      const result = response.data;
      setName(
        result.first_name +
          (result.last_name !== null ? " " + result.last_name : "")
      );
      setPhone(result.mobileNumber);
      setAddress1(result.address ? result.address.address1 : "");
      setAddress2(result.address ? result.address.address2 : "");
      setCity(result.address ? result.address.city : "");
      setState(result.address ? result.address.state : "");
      setPinCode(result.address ? result.address.zipCode : "");
    } catch (err) {
      throw err;
    }
  };

  const updateDetails = async (event) => {
    event.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      const role = sessionStorage.getItem("role");
      if (token === null || role === null) {
        console.log("First Login");
        return;
      }
      var url;
      if (role === "CUSTOMER") {
        url = `${base_url}/api/customer/updateInfo`;
      } else if (role === "SELLER") {
        url = `${base_url}/api/seller/updateInfo`;
      } else {
        console.error("Role is Invalid");
        return;
      }
      const nameArray = name.split(" ");
      const first_name = nameArray[0];
      const last_name = nameArray[1];
      axios
        .post(
          url,
          {
            person: {
              address: {
                address1: address1,
                address2: address2,
                city: city,
                state: state,
                zipCode: pinCode,
              },
              first_name: first_name,
              last_name: last_name,
              mobileNumber: phone,
            },
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
          if (response.data.success) {
            toast.success("Profile Update Successfully");
          } else {
            toast.error("Something Went Wrong");
          }
        })
        .catch((error) => {
          toast.error("Something Went Wrong");
        });

      if (profileImage !== null) {
        const formData = new FormData();
        formData.append("image", image);
        console.log(image);
        axios
          .post(`${base_url}/api/person/upload`, formData, {
            headers: {
              Authorization: "Bearer " + token,
            },
            withCredentials: true,
          })
          .then((response) => response.data)
          .catch((error) => console.log(error));
      }
    } catch (err) {
      console.error("Something went wrong");
    }
  };

  useEffect(() => {
    getDetails();
    getProfileImage();
  }, []);

  return (
    <div
      className={styles.profileCover}
      onMouseEnter={() => handleImageClick(false)}
    >
      <ToastContainer />
      {/* Render NavBar based on role */}
      {role === "CUSTOMER" && <NavBar />}
      {role === "SELLER" && <SellerNavbar />}
      <div className={styles.formContainer}>
        <div className={styles.profilePicture}>
          <div
            className={styles.pictureContainer}
            onMouseEnter={() => handleImageClick(true)}
          >
            {profileImage ? (
              <img src={profileImage} alt="Selected Image" />
            ) : (
              <FaUser size={140} />
            )}
            <div className={styles.uploadLabel}>
              <i className="fa fa-camera" />
              <span>Change Photo</span>
            </div>
          </div>
          {showDropdown && (
            <div
              className={styles.dropdownContent}
              onMouseLeave={() => handleImageClick(false)}
            >
              <Link>
                <a onClick={handleOpenDirectory}>Upload</a>
              </Link>
              <Link>
                <a onClick={deleteImage}>Delete</a>
              </Link>
            </div>
          )}
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </div>
        <form className={`${styles.profileForm} ${styles.profileform}`}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={name}
            className={styles.txt}
            onChange={(event) => setName(event.target.value)}
          />
          <label htmlFor="mobile">Mobile Number:</label>
          <input
            type="tel"
            id="mobile"
            placeholder="Enter your mobile number"
            value={phone}
            className={styles.txt}
            onChange={(event) => setPhone(event.target.value)}
          />
          <label htmlFor="address1">Address Line 1:</label>
          <input
            type="text"
            id="address1"
            placeholder="Enter your address line 1"
            value={address1}
            className={styles.txt}
            onChange={(event) => setAddress1(event.target.value)}
          />
          <label htmlFor="address2">Address Line 2:</label>
          <input
            type="text"
            id="address2"
            placeholder="Enter your address line 2"
            value={address2}
            className={styles.txt}
            onChange={(event) => setAddress2(event.target.value)}
          />
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            placeholder="Enter your city"
            value={city}
            className={styles.txt}
            onChange={(event) => setCity(event.target.value)}
          />
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            placeholder="Enter your state"
            value={state}
            className={styles.txt}
            onChange={(event) => setState(event.target.value)}
          />
          <label htmlFor="pincode">Pin Code:</label>
          <input
            type="text"
            id="pincode"
            placeholder="Enter your pin code"
            value={pinCode}
            className={styles.txt}
            onChange={(event) => setPinCode(event.target.value)}
          />
          <div style={{ paddingBottom: "10%" }}>
            <button
              type="submit"
              className={styles.updateButton}
              onClick={(event) => updateDetails(event)}
            >
              Update
            </button>
            <button
              type="button"
              className={styles.backButton}
              onClick={() => backHandler()}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
