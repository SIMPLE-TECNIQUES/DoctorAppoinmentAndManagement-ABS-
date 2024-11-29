import React from "react";
import image from "../images/aboutimg.jpg";

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
            Our online health consultation and doctor appointment service provides easy access to certified healthcare professionals from the comfort of your home. Schedule appointments flexibly, enjoy secure video consultations, and manage your healthcare efficiently with instant confirmations and reminders.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
