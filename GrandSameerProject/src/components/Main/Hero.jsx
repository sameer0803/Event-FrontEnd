import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          We Create <br />
          <span>Temporary Infrastructure at Scale</span>
        </h1>
        <p>
          Grand Sameer Events Pvt. Ltd. delivers large-scale temporary
          infrastructure solutions for government summits, political events,
          exhibitions, and high-profile corporate projects across India.
        </p>

        <p className="hero-sub">
          From aluminium hangars and domes to climate-controlled event spaces —
          we build reliable, secure, and execution-perfect environments for
          critical events.
        </p>

        <div className="hero-actions">
          <button className="primary-btn">Explore Our Work</button>
          <button className="secondary-btn">Contact Us</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
