import { useState } from "react";
import React from 'react'

const Contact = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const handleSubmit = (event) => {
        const token = sessionStorage.getItem('token');
        fetch('http://localhost:8080/api/customer/getCustomerOrders', {
                method : 'GET',
                headers : {
                    'Authorization' : 'Bearer '+token,
                    'Accept' : 'application/json',
                    'Content-type' : 'application/json'
                }
            })
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
            })
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        event.preventDefault();
        const formData = {
          "message": message,
          "mobileNum": phone,
          "name": name,
        }
        fetch('http://localhost:8080/public/api/contact/saveMsg', {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((data) => {
            if(data.success){
              window.location.href = '/';
            }else{
              throw new Error(JSON.stringify(data));
            }
          })
          .catch((error) => console.error(error));
      }
  return (
    <section className="contact" id="contact">
        <h1 className="heading">contact us</h1>
        <div className="box-container">
          <div className="box">
            <h3>address</h3>
            <p>Lorem ipsum dolor sit amet conse</p>
            <h3>email</h3>
            <p>sighaditya25@gmail.com</p>
            <p>vipinkumar@gmail.com</p>
            <h3>phone</h3>
            <p>8826077063</p>
            <p>9310139949</p>
          </div>

          <script src="ContactForm.js"></script>
          <form
            action="mailto:sighaditya@gmail.com"
            method="post"
            enctype="text/plain"
            onSubmit={handleSubmit}
          >
            <div className="inputBox">
              <input id = "name" type="text" placeholder="your name" 
              name="name" value={name}
              onChange={(event) => setName(event.target.value)}/>
              <input id = "phone" type="text" placeholder="your number" 
              name="phone" value={phone}
              onChange={(event) => setPhone(event.target.value)}/>
            </div>
            <textarea
              name="message"
              placeholder="your message"
              id="message"
              cols="30"
              rows="10"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            ></textarea>
            <input type="submit" value="send message" className="btn" />
          </form>
        </div>
      </section>

  )
}

export default Contact