import React from "react";
import image from "../img/des.png";

const AboutUs = () => {
  return (
    <>
      <section className="container">
        <h2 className="page-heading about-heading">About Us</h2>
        <div className="about">
          <div className="hero-img">
            <img
              src={image}
              alt="hero"
            />
          </div>
          <div className="hero-content">
            <p>
              Preparing a highly scientific efficient dentist qualified to follow up on specialist studies.
              Developing scientific research methods in the field of dentistry
              Meeting the labor market need of dentists.
              Providing distinguished treatment services to patients in all dental specialties, by students under the supervision of a team of professors who possess scientific and practical experience, and using modern technologies in the areas of treatment.
              Spreading health awareness in the community and the necessary prevention methods to maintain oral and dental health.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
