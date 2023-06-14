import React from 'react'
import { useNavigate } from 'react-router-dom';

const auth = ({children}) => {
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

    if(!token)
    return navigate("/login")
    
  return (
    {children}
  )
}

export default auth