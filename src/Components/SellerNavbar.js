import React from 'react'
import "./SellerNavbar.css"
import {
    // useNavigate,
    Link, json,
  } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
const SellerNavbar = () => {
    const navigate = useNavigate();

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
  return (
    <header className="contain">
        <Link to={role === 'CUSTOMER' ? '/' : '/sellerdashboard'} className="logo">
          av<span>Service</span>
        </Link>
        <a className="menu fas fa-bars"></a>
        <nav className="navbar bg-color-dark">
         
          <Link onClick={logoutHandler}>logout</Link>
          
         
        </nav>
      </header>
  )
}

export default SellerNavbar