import React,{useEffect, useState} from 'react';
import Login from '../Login';
import axios from 'axios';
import base_url from '../../api/Service';
import {
    // useNavigate,
    Link, json,
  } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const [showNavForm, setShowNavForm] = useState(false);
  const token = sessionStorage.getItem('token');
  const role = sessionStorage.getItem('role');
  const logoutHandler = () =>{
    axios.post(`${base_url}/api/person/logout`, {}, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    withCredentials : true,
  })
    .then(response => {
      if (response.status === 201 || response.status === 200) {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('role');
        return navigate('/');
      }
    })
    .catch(error => console.error(error));

    
}
const handleShowNavFormChange = (value) => {
  setShowNavForm(value);
};
  document.onscroll = () => {
  
    if (window.scrollY > 0) {
      document.querySelector('.header').classList.add('active');
    } else {
      document.querySelector('.header').classList.remove('active');
    }
  };
  
  document.onload = () => {
    if (window.scrollY > 0) {
      document.querySelector('.header').classList.add('active');
    } else {
      document.querySelector('.header').classList.remove('active');
    }
  };

  return (
    <div>
    <header className="header">
        <Link to={role === 'CUSTOMER' ? '/' : '/sellerdashboard'} className="logo">
          av<span>Service</span>
        </Link>
        <a className="menu fas fa-bars"></a>
        <nav className="navbar bg-color-dark">
        <Link to='/' onClick={()=>setShowNavForm(false)}>home</Link>
        <Link to={'/'}>about</Link>
          {role==="SELLER"?null: <Link to="/services">services</Link>}
          <Link to={'/'}>contact</Link>
          {token?<><Link to="/profile" className="open-login" id="profile">
            profile
          </Link> 
          <Link to = "/customercart" >cart</Link>
          <Link onClick={logoutHandler}>logout</Link></>
          
          :
          /*<Link to="/login" className="open-login" id="login">
            Login
          </Link>}*/
          <Link onClick={() => setShowNavForm(!showNavForm)}>Login</Link>}
        </nav>
      </header>
      {showNavForm && <Login setShowNavForm={handleShowNavFormChange}/>}
      </div>
  )
}
export default NavBar