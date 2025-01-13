import { SwiperNavButtons } from "@/Components/SwiperNavButton";
import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const LeftSection = () => {
  return (
    <Box className='auth-slider-wrap'>
      <Swiper
        slidesPerView={1}
        loop
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: false,
        // }}
        modules={[Navigation, Autoplay]}
        className='authSwiper'
      >
        <SwiperSlide>
          <Box className='auth-slider-img-holder'>
            <Image fill src='/images/auth-slider-img1.jpg' alt='' />
            <Box className='auth-slider-info'>
              <Box className='auth-slider-info-inner'>
                <Box className='auth-slider-info-inner-top'>
                  <h1>
                    Start Your <br />
                    Journey With Us.
                  </h1>
                  <SwiperNavButtons />
                </Box>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Integer vel sed enim
                  aliquet volutpat adipiscing ante amet. Aliquet volutpat ut
                  magna lectus mi eu consectetur placerat facilisi. Enim et
                  cursus at semper massa justo gravida. Eu parturient et neque
                  morbi felis vitae nunc fermentum.
                </p>
              </Box>
            </Box>
          </Box>
        </SwiperSlide>

        <SwiperSlide>
          <Box className='auth-slider-img-holder'>
            <Image fill src='/images/signup-slider-img1.jpg' alt='' />
            <Box className='auth-slider-info'>
              <Box className='auth-slider-info-inner'>
                <Box className='auth-slider-info-inner-top'>
                  <h1>
                    Start Your <br />
                    Journey With Us.
                  </h1>
                  <SwiperNavButtons />
                </Box>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Integer vel sed enim
                  aliquet volutpat adipiscing ante amet. Aliquet volutpat ut
                  magna lectus mi eu consectetur placerat facilisi. Enim et
                  cursus at semper massa justo gravida. Eu parturient et neque
                  morbi felis vitae nunc fermentum.
                </p>
              </Box>
            </Box>
          </Box>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default LeftSection;
