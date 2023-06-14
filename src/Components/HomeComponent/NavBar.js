import React,{useEffect, useState} from 'react';
import Login from '../Login';
import {
    // useNavigate,
    Link, json,
  } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Signup from '../Signup';

const NavBar = () => {
  const navigate = useNavigate();
  const [showNavForm, setShowNavForm] = useState(false);
  const token = sessionStorage.getItem('token');
  const role = sessionStorage.getItem('role');
  const logoutHandler = () =>{
    fetch('http://localhost:8080/api/person/logout',{
      method : 'POST',
      headers :{
        'Content-type' : 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer '+token
      }
    })
    .then(
      res =>{
        console.log(res.status,"dfdf")
        if(res.status == 201 || res.status == 200 )
        {
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('role');

          return navigate('/');
        }
      }
      
    )
    .catch(error=>console.error(error))
    
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
          <a href="#about">about</a>
          {role==="SELLER"?null: <Link to="/services">services</Link>}
          <a href="#contact">contact</a>
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