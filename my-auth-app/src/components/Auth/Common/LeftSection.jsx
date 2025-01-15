import { Box } from "@mui/material";
import React, { useRef } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

const LeftSection = () => {
  const swiperRef = useRef(null);

  const goToNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  const goToPrev = () => {
    swiperRef.current.swiper.slidePrev();
  };

  return (
    <Box className="auth-slider-wrap">
      <Swiper
        ref={swiperRef}
        slidesPerView={1}
        loop
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 3000 }}
        className="authSwiper"
      >
        <SwiperSlide>
          <Box className="auth-slider-img-holder">
            <img 
              src="/images/auth-slider-img1.jpg" 
              alt="Slider 1" 
              style={{ width: "100%", height: "auto", position: "absolute" }} 
            />
            <Box className="auth-slider-info">
              <Box className="auth-slider-info-inner">
                <Box className="auth-slider-info-inner-top">
                  <h1>
                    Start Your <br />
                    Journey With Us.
                  </h1>
                </Box>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Integer vel sed enim
                  aliquet volutpat adipiscing ante amet. Aliquet volutpat ut
                  magna lectus mi eu consectetur placerat facilisi.
                </p>
              </Box>
            </Box>
          </Box>
        </SwiperSlide>

        <SwiperSlide>
          <Box className="auth-slider-img-holder">
            <img 
              src="/images/signup-slider-img1.jpg" 
              alt="Slider 2" 
              style={{ width: "100%", height: "auto", position: "absolute" }} 
            />
            <Box className="auth-slider-info">
              <Box className="auth-slider-info-inner">
                <Box className="auth-slider-info-inner-top">
                  <h1>
                    Start Your <br />
                    Journey With Us.
                  </h1>
                </Box>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Integer vel sed enim
                  aliquet volutpat adipiscing ante amet. Aliquet volutpat ut
                  magna lectus mi eu consectetur placerat facilisi.
                </p>
              </Box>
            </Box>
          </Box>
        </SwiperSlide>
      </Swiper>

      <Box className="swiper-nav-buttons">
        <button onClick={goToPrev}>Previous</button>
        <button onClick={goToNext}>Next</button>
      </Box>
    </Box>
  );
};

export default LeftSection;
