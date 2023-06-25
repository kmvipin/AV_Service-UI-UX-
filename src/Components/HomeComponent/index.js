import React from 'react';
import Home from './Home';
import NavBar from "./NavBar";
import About from "./About";
import OurService from "./OurService";
import Contact from "./Contact";
import Footer from "./Footer";
import "../../App.css";
const HomeComponent = () => {
  return (
  <div>
    <NavBar />
    <Home/>
    <About />
    <OurService />
    <Contact />
    <Footer />
  </div>
  )
}

export default HomeComponent