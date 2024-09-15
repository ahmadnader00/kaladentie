import React from "react";
import image from "../img/WEJ_9400.jpg";
import "../styles/hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Your Health, <br />
          Our Responsibility
        </h1>
        <p>
        Seeking to teach contemporary dental science for undergraduate students,
          in a way that ensures the building of a graduate with a strong foundation in scientific,
          practical and ethical terms is the mission of the Faculty of Dentistry at University of kalamoon.
          This graduate will be eligible to either directly practice the profession or pursue scientific research in various regional or international universities.

          To achieve this, we provide the ideal educational environment with its the effective academic staff and infrastructures, equipped with the latest equipment (laboratories, clinics, and patient admission office) to ensure that our students are getting the  practical experience in parallel with providing free and excellent treatments for patients.
        </p>
      </div>
      <div className="hero-img">
        <img
          src={image}
          alt="hero"
        />
      </div>
    </section>
  );
};

export default Hero;
