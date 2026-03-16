import './MainFile.css';
// import SameerEvents from "../../assets/mainFileVideo/SameerEvents.mp4";
import installation2 from "../../assets/eventAndVideo/SameerEventsSecondFinal.mp4";


const MainFile = () => {
  return (
    <main id="main-content">
      {/* 🔹 Background Video */}
      <div className="video-background">
        <video autoPlay loop muted playsInline className="background-video">
          {/* <source src={SameerEvents} type="video/mp4" /> */}
          <source src={installation2} type="video/mp4" />

        </video>
      </div>

      {/* 🔹 Foreground Content */}
      <div className="hero-inner">
        <div className="inner-content">
          
          <h1>Grand Sameer <strong>Events Pvt. Ltd.</strong></h1>  
          <a href="#" className="inner-content-button">
            Contact LDB
          </a>
        </div>
      </div>
    </main>
  );
};

export default MainFile;
