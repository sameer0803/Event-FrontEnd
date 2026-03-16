
import "./MainGallery.css";

// Replace these with your actual image imports from assets
// import img1 from "../../assets/images/gallery1.jpg";
// import img2 from "../../assets/images/gallery2.jpg";
// import img3 from "../../assets/images/gallery3.jpg";
// import img4 from "../../assets/images/gallery4.jpg";

import img1 from "../../assets/spaceSolution/Sagar1.jpeg";
import img2 from "../../assets/spaceSolution/BhopalA16.jpeg";
import img3 from "../../assets/spaceSolution/BhopalA8.jpeg";
import img4 from "../../assets/spaceSolution/Raltam3.jpeg";

const MainGallery = () => {
  return ( 
    <div className="gallery-section">
      <div className="gallery-container">
        <div className="gallery-header">
          <p className="gallery-subtitle">Grand Sameer Events Pvt. Ltd.</p>
          <h2 className="gallery-title">Explore our innovative space solutions</h2>
        </div>

        <div className="gallery-grid">
          <div className="gallery-card">
            <div className="gallery-image">
              <img src={img1} alt="Event Space" loading="lazy" />
            </div>
            <div className="gallery-content">
              <h3>Event Space</h3>
              <p>Complete, scalable structures for large-scale events — political rallies, corporate summits, exhibitions, trade fairs, and cultural festivals. We handle full planning, execution, and on-ground integration.</p>
              <a href="#" className="gallery-link">Learn More →</a>
            </div>
          </div>

          <div className="gallery-card">
            <div className="gallery-image">
              <img src={img2} alt="Commercial Space" loading="lazy" />
            </div>
            <div className="gallery-content">
              <h3>Commercial & Public Space</h3>
              <p>Semi-permanent buildings for commercial use — retail, administrative offices, waiting lounges, airport overflow structures, etc. Flexible and durable for long-term usage.</p>
              <a href="#" className="gallery-link">Learn More →</a>
            </div>
          </div>

          <div className="gallery-card">
            <div className="gallery-image">
              <img src={img3} alt="Rapid Deployment" loading="lazy" />
            </div>
            <div className="gallery-content">
              <h3>Rapid Deployment</h3>
              <p>Emergency-ready structures used for government operations, disaster relief, command centers, medical units, and defence-grade setups. Installed in record timelines.</p>
              <a href="#" className="gallery-link">Learn More →</a>
            </div>
          </div>

          <div className="gallery-card">
            <div className="gallery-image">
              <img src={img4} alt="Industrial Space" loading="lazy" />
            </div>
            <div className="gallery-content">
              <h3>Industrial Space</h3>
              <p>High-strength hangars and modular warehouses for factories, plants, logistics hubs, repair bays, storage, and temporary expansions. Designed to support heavy-duty operations.</p>
              <a href="#" className="gallery-link">Learn More →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainGallery;

