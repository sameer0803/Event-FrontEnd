// Solutions.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "./Solutions.css";

// (images + data SAME as yours, no change)
import img11 from "../../assets/aboutUs/Jabalpur14.jpeg";
import img12 from "../../assets/aboutUs/BhopalA12.jpeg";
import img13 from "../../assets/aboutUs/Jabalpur13.jpeg";
import img14 from "../../assets/aboutUs/Jabalpur12.jpeg";
import img15 from "../../assets/aboutUs/Jabalpur15.jpeg";

import img21 from "../../assets/aboutUs/Bhopal9.jpeg";
import img22 from "../../assets/aboutUs/UjjainLekodaSite3.jpeg";
import img23 from "../../assets/aboutUs/Phitampur1.jpeg";
import img24 from "../../assets/aboutUs/Bhopal4.jpeg";
import img25 from "../../assets/aboutUs/Raltam2.jpeg";

import img31 from "../../assets/aboutUs/BhopalA21.jpeg";
import img32 from "../../assets/aboutUs/BhopalA24.jpeg";
import img33 from "../../assets/aboutUs/BhopalA22.jpeg";
import img34 from "../../assets/aboutUs/BhopalA23.jpeg";
import img35 from "../../assets/aboutUs/BhopalA17.jpeg";

import img41 from "../../assets/aboutUs/Sagar1.jpeg"
import img42 from "../../assets/aboutUs/BhopalA3.jpeg"
import img43 from "../../assets/aboutUs/UjjainLekodaSite4.jpeg"
import img44 from "../../assets/aboutUs/BhopalA7.jpeg"
import img45 from "../../assets/aboutUs/BhopalA5.jpeg"

import img51 from "../../assets/aboutUs/BhopalA14.jpeg";
import img52 from "../../assets/aboutUs/BhopalA20.jpeg";
import img53 from "../../assets/aboutUs/Raltam3.jpeg";
import img54 from "../../assets/aboutUs/Jabalpur4.jpeg";
import img55 from "../../assets/aboutUs/Jabalpur6.jpeg";

import img61 from "../../assets/aboutUs/BhopalA4.jpeg";
import img62 from "../../assets/aboutUs/Bhopal5.jpeg";
import img63 from "../../assets/aboutUs/Jabalpur12.jpeg";
import img64 from "../../assets/aboutUs/Sagar4.jpeg";
import img65 from "../../assets/aboutUs/BhopalA1.jpeg";
 
import img71 from "../../assets/aboutUs/BhopalA25.jpeg";
import img72 from "../../assets/aboutUs/BhopalA25.jpeg";
import img73 from "../../assets/aboutUs/BhopalA25.jpeg";
import img74 from "../../assets/aboutUs/BhopalA25.jpeg";
import img75 from "../../assets/aboutUs/BhopalA25.jpeg";


const data = [
  {
    id: "sol-1",
    title: "🏛️ Government & Institutional Events",
    images: [img11, img12, img13, img14, img15],
    desc: "From Prime Ministerial rallies to state-level government programs, we deliver secure, protocol-compliant temporary infrastructure at scale."
  },
  {
    id: "sol-2",
    title: "🗳️ Mega Political Gatherings",
    images: [img21, img22, img23, img24, img25],
    desc: "We specialize in mass-scale political rallies with large-span hangars, crowd-ready layouts, and rapid on-ground execution."
  },
  {
    id: "sol-3", 
    title: "🏢 Corporate & Business Excellence",
    images: [img31, img32, img33, img34, img35], 
    desc: "World-class infrastructure for corporate summits, investor meets, exhibitions, and high-profile business events."
  },
  {
    id: "sol-4",
    title: "🕉️ Cultural & Religious Gatherings",
    images: [img41, img42, img43, img44, img45],
    desc: "Infrastructure for large religious congregations, spiritual events, and gatherings led by Jain saints, spiritual leaders, and religious institutions."
  },
  {
    id: "sol-5",
    title: "🎶 Concerts & Entertainment Arena",
    images: [img51, img52, img53, img54, img55],
    desc: "High-capacity structures for live concerts, music festivals, and entertainment events with safe crowd flow and strong execution."
  },
  {
    id: "sol-6",
    title: "💍 Luxury Weddings & Private Celebrations",
    images: [img61, img62, img63, img64, img65],
    desc: "Designer hangars, grand mandaps, and premium setups for large weddings and exclusive private celebrations."
  },
  {
    id: "sol-7",
    title: "🎭 Sports & Entertainment Events",
    images: [img71, img72, img73, img74, img75],
    desc: "Temporary stadium-scale infrastructure for sports events, shows, and large public entertainment programs."
  }
];


const Solutions = () => {
  const location = useLocation();

  // ✅ Auto scroll after page load
  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100); // DOM fully render hone ke liye
      }
    }
  }, [location]);

  return (
    <section className="solutions-section">
      <div className="solutions-container">
        <div className="solutions-header">
          <h2>Solutions / What We Do</h2>
          <p>Each category has its own elegant subpage...</p>
        </div>

        <div className="solution-Imgcontent">
          {data.map((item, index) => (
            <div
              id={item.id}
              key={item.id}
              className={`solution-card ${
                index % 2 === 1 ? "reverse-layout" : ""
              }`} 
            >
              <div className="solution-image">
                <Swiper
                  modules={[Autoplay, Navigation]}
                  slidesPerView={1}
                  loop
                  navigation
                  autoplay={{ delay: 2500, disableOnInteraction: false }}
                >
                  {item.images.map((img, i) => (
                    <SwiperSlide key={i}>
                      <img src={img} alt={item.title} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="solution-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
