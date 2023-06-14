import React from 'react'
import Mechanic from "../../Assets/icon-1.png";
import Bike from "../../Assets/icon-1.png";
import Other from "../../Assets/icon-2.png";
const OurService = () => {
  return (
    <section className="services" id="services">
        <h1 className="heading">our services</h1>
        <div className="box-container">
          <div className="box" id="mechanic">
            <img src={Mechanic} alt="" />
            <h3>Mechanic</h3>
            <p>
              Bicycle mechanics repair fleet bikes and teach participants how to
              repair and maintain their own bikes. supplies Fit participants to
              the right size and style bike and safety.
            </p>
          </div>
          <div className="box" id="bike-reparing">
            <img src={Bike} alt="" />
            <h3>
              <a href=""></a> Bike reparing
            </h3>
            <p>
              An Auto Mechanic, or Service Technician, fixes vehicles and
              replaces their parts for customers. Their duties include
              inspecting and repair work on cars, trucks and other vehicles.
            </p>
          </div>
          <a href="categorie_pages/categorie_page.html">
            <div className="box">
              <img src={Other} alt="" />
              <h3>Other services</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                similique harum enim nemo sit dolore magnam error quisquam ullam
                fugiat!
              </p>
            </div>
          </a>
        </div>
      </section>
  )
}

export default OurService