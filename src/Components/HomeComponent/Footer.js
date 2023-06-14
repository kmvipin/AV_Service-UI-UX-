import React from 'react'
import {
    FaGoogle,
    FaTwitter,
    FaYoutube,
    FaLinkedin,
    FaWhatsapp,
  } from "react-icons/fa";
const Footer = () => {
  return (
    <section className="footer">
        <a href="#" className="logo">
          Av<span>Service</span>
        </a>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. <br />
          Vero officia tempora eos in dignissimos odio minima? <br />
          Eum ducimus magnam debitis?
        </p>
        <div className="socials">
          <ion-icon name="logo-google">
            <FaGoogle />
          </ion-icon>
          <ion-icon name="logo-twitter">
            <FaTwitter />
          </ion-icon>
          <ion-icon name="logo-youtube">
            <FaYoutube />
          </ion-icon>
          <ion-icon name="logo-linkedin">
            <FaLinkedin />
          </ion-icon>
          <ion-icon name="logo-whatsapp">
            <FaWhatsapp/>
          </ion-icon>
        </div>
      </section>
  )
}

export default Footer