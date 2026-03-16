
import React from "react";
import "./MainGalleryA.css";

// import eventImg from "../../assets/images/event.jpg";
// import commercialImg from "../../assets/images/commercial.jpg";
// import rapidImg from "../../assets/images/rapid.jpg";

import HangersImg from "../../assets/spaceSolution/Bhopal7.jpeg";
import PoliticalImg from "../../assets/spaceSolution/Phitampur1.jpeg";
import rapidImg from "../../assets/spaceSolution/BhopalA25.jpeg";

const MainGalleryA = () => {
  return (

    <div className="main-section-container">
      <div className="block">
        <div className="container">
          <div className="section-header">
            <p className="top-title">Grand Sameer Events Pvt. Ltd. —</p>
            <h2 className="section-title">
              Temporary and semi-permanent space solutions
            </h2>
          </div>

          <div className="columns">
            <div className="columns__item">
              <div className="columns__image">
                <img src={HangersImg} alt="Event Space" loading="lazy" />
              </div>
              <div className="columns__text">
                <h3 className="columns__title">🏗️ Hangars & Aluminium Domes</h3>
                <p>
                  Large-span structures for summits, exhibitions, and mega events.
                </p>
                <a
                  href="/global/solutions/event-space-rental/"
                  className="columns__link"
                >
                  Our Event rental solutions →
                </a>
              </div>
            </div>

            <div className="columns__item">
              <div className="columns__image">
                <img src={PoliticalImg} alt="Commercial & Public Space" loading="lazy" />
              </div>
              <div className="columns__text">
                <h3 className="columns__title">🏛️ Political & Government Infrastructure</h3>
                <p>
                  Secure, compliant setups for rallies, programs, and public events.
                </p>
                <a
                  href="/global/solutions/commercial-space/"
                  className="columns__link"
                >
                  Our Commercial solutions →
                </a>
              </div>
            </div>

            <div className="columns__item">
              <div className="columns__image">
                <img src={rapidImg} alt="Rapid Deployment Space" loading="lazy" />
              </div>
              <div className="columns__text">
                <h3 className="columns__title">⚡ Rapid Execution Projects</h3>
                <p>
                  Time-critical infrastructure delivered with speed and precision.
                </p>
                <a
                  href="/global/solutions/rapid-deployment-space/"
                  className="columns__link"
                >
                  Our Rapid Deployment solutions →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* SectionDivider.css  */}
      <div className="block-border">
        <div className="main-border-container">
          <span className="divider--branded"></span>
        </div>
      </div>
    </div>
  );
};

export default MainGalleryA;

