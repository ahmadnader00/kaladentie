import React from "react";
import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";


const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutUs />
      <Footer />
    </>
  );
};

export default Home;
