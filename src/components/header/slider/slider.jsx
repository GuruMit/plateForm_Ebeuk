import React , { useRef, useState }from "react";
import { Container } from "react-bootstrap";

//
import { SliderImages } from "../../../data/sliderInfo";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/scss/pagination";
import 'swiper/scss/navigation';



// import required modules
import {Autoplay , Zoom , Pagination } from "swiper";

//custom css
import  "./slider.scss";

const Slider = () => {

    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  return (
    <>
    
    <Container className="s-container">

    <Swiper
      slidesPerView={3}
      spaceBetween={30}
      loop = {true}
      zoom={true}
      centeredSlides={true}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Zoom , Pagination]}
      className="mySwiper"

      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      onAutoplayTimeLeft={onAutoplayTimeLeft}
        
        >
        {SliderImages.map((slide, index) => (
  <SwiperSlide>
    {/* <div className="up-s bg">
      <div className="name">
       <a href=""><span>{slide.name}</span></a>
      </div>

      <span className="profile">
        {slide.profile}+
      </span>

    </div> */}

    <img src={slide.img} alt="product" className="img_p"></img>
  </SwiperSlide>
))}

    <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
        
      </Swiper>
    
    
    </Container>

    </>
  )
}

export default Slider