import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "./CasesSection.css";

// import case1 from "../../assets/cases/cases1.jpg";
// import case2 from "../../assets/cases/cases2.jpg";
// import case3 from "../../assets/cases/cases3.jpg";
// import case4 from "../../assets/cases/cases4.jpg";
// import case5 from "../../assets/cases/cases5.jpg";
// import case6 from "../../assets/cases/cases6.jpg";
// import case7 from "../../assets/cases/cases7.jpg";

import case1 from "../../assets/cases/BhopalA2.jpeg";
import case2 from "../../assets/cases/Phitampur4.jpeg";
import case3 from "../../assets/cases/Sagar4.jpeg";
import case4 from "../../assets/cases/UjjainLekodaSite4.jpeg";
import case5 from "../../assets/cases/Jabalpur14.jpeg";
import case6 from "../../assets/cases/Ujjain3.jpeg";
import case7 from "../../assets/cases/Bhopal6.jpeg";
import case8 from "../../assets/cases/Raltam1.jpeg";

const CasesSection = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const cases = [
    { img: case1, title: "COP26 Project" },
    { img: case2, title: "Formula E in Saudi Arabia" },
    { img: case3, title: "Extra warehouse space delivered in 8 weeks" },
    { img: case4, title: "International Astronautical Congress in Baku" },
    { img: case5, title: "Temporary School Lytchett Minster Upper School" },
    { img: case6, title: "Land Rover Offroad Experience Center" },
    { img: case7, title: "German television - FIFA World Cup 2022 TV Studio" },
    { img: case8, title: "Raltam" },
  ];

  return (
    <section className="cases-block-dark">
      <div className="cases-container">
        <div className="cases-header">
          <p className="cases-top-title">Cases</p>
          <h2 className="cases-heading">We love to show you our work</h2>
        </div>

        <div className="cases-wrapper">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.6} // shows 80% + 20% of next image
            loop={true}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            autoplay={{ delay: 5000, disableOnInteraction: true }}
            onSwiper={(swiper) => {
              setTimeout(() => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              });
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 1.4 },
              992: { slidesPerView: 1.6 },
            }}
          >
            {cases.map((item, i) => (
              <SwiperSlide key={i}>
                <div className="cases-slide-item">
                  <figure className="cases-figure">
                    <img src={item.img} alt={item.title} className="cases-image" />
                    <figcaption className="cases-caption">
                      <h3>{item.title}</h3>
                    </figcaption>
                  </figure>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="cases-navigation">
            <button ref={prevRef} className="cases-nav-btn prev" aria-label="Previous">
              <span className="arrow left"></span>
            </button>
            <button ref={nextRef} className="cases-nav-btn next" aria-label="Next">
              <span className="arrow right"></span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CasesSection;
