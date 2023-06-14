import React from 'react'
import about from "../../Assets/electician(about).jpg";

const About = () => {
  return (
    <section className="about" id="about">
        <div className="box-container">
          <div className="box">
            <h1 className="heading">about us</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Temporibus pariatur, facere, iusto maxime, reiciendis aspernatur
              illo neque ex atque dicta provident accusantium debitis!
              Recusandae commodi numquam, vero eveniet inventore quas.
            </p>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Temporibus pariatur, facere, iusto maxime, reiciendis aspernatur
              illo neque ex atque dicta provident accusantium debitis!
              Recusandae commodi numquam, vero eveniet inventore quas.
            </p>
          </div>

          <div className="box">
            <div className="image">
              <img src={about} alt="" />
            </div>
          </div>
        </div>
      </section>
  )
}

export default About