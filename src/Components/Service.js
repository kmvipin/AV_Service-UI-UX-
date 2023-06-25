import React, { useState } from "react";
import "./ServiceStyles.css";
import Electrician from "../Assets/electrician_icon.png";
import Plumber from "../Assets/plumbe.png";
import Laptop from "../Assets/laptop-computer.png";
import WashingMachine from "../Assets/washing-_machine.png";
import AirConditioner from "../Assets/air_conditioner.png";
import Television from "../Assets/television.png";
import Carpenter from "../Assets/carpenter.png";
import Mechanic from "../Assets/mechanics.png";
import Refrigerator from "../Assets/refrigator.png";
import { Link } from "react-router-dom";
import NavBar from "./HomeComponent/NavBar";
import "./error.css";

const Service = () => {
  const data = [
    {
      id: "ELECTRICIAN",
      name: "Electrician",
      src: Electrician,
      description:
        "Installing or replacing electrical outlets, switches, or fixtures" +
        "Upgrading or installing electrical panels or circuit breakers" +
        "Troubleshooting and repairing electrical problems or faults" +
        "Installing or replacing wiring for appliances or lighting",
    },
    {
      id: "PLUMBER",
      name: "Plumber",
      src: Plumber,
      description:
        "Got a leaky faucet or clogged drain? Our expert plumbers are just a phone call away!" +
        "From routine plumbing maintenance to emergency repairs, our team has the knowledge and experience to handle any job.",
    },
    {
      id: "MECHANIC",
      name: "Mechanic",
      src: Mechanic,
      description:
        "Trust our experienced mechanics to get you back on the road safely." +
        "Our skilled mechanics have the knowledge and tools to diagnose and repair any automotive issue, from routine tune-ups to major engine repairs.",
    },
    {
      id: "LAPTOP",
      name: "Laptop",
      src: Laptop,
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit quis quisquam rerum, pariatur molestiae consectetur soluta corrupti vel? Odio dolore laborum perferendis ullam ab inventore?",
    },
    {
      id: "REFRIGERATOR",
      name: "Refrigerator",
      src: Refrigerator,
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit quis quisquam rerum, pariatur molestiae consectetur soluta corrupti vel? Odio dolore laborum perferendis ullam ab inventore?",
    },
    {
      id: "WASHINGMACHINE",
      name: "Washing Machine",
      src: WashingMachine,
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit quis quisquam rerum, pariatur molestiae consectetur soluta corrupti vel? Odio dolore laborum perferendis ullam ab inventore?",
    },
    {
      id: "TELEVISION",
      name: "Television",
      src: Television,
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit quis quisquam rerum, pariatur molestiae consectetur soluta corrupti vel? Odio dolore laborum perferendis ullam ab inventore?",
    },
    {
      id: "CARPENTER",
      name: "Carpenter",
      src: Carpenter,
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit quis quisquam rerum, pariatur molestiae consectetur soluta corrupti vel? Odio dolore laborum perferendis ullam ab inventore?",
    },
    {
      id: "AC",
      name: "Air Conditioner",
      src: AirConditioner,
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit quis quisquam rerum, pariatur molestiae consectetur soluta corrupti vel? Odio dolore laborum perferendis ullam ab inventore?",
    },
  ];

  return (
    <>
      <NavBar />
      <div className="wrapper">
        <h1 className="service-heading">Select Your Service category</h1>
        {data.map((obj) => (
          <div className="boxx">
            <img src={obj.src} id={obj.name} alt=""></img>
            <h1>{obj.name}</h1>
            <p>
              {obj.description}
              <Link
                to="/serviceDetails"
                className="btn"
                state={{ service: obj }}
              >
                Explore
              </Link>
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Service;
