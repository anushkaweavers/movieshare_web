import Image from "next/image";
import React from "react";
import { useSwiper } from "swiper/react";

export const SwiperNavButtons = () => {
  const swiper = useSwiper();

  return (
    <div className='swiper-nav-btns'>
      <button
        aria-label='next'
        type='button'
        onClick={() => {
          swiper.slidePrev();
        }}
      >
        <Image
          width={32}
          height={32}
          src='/images/slider-left-arrow.svg'
          alt=''
        />{" "}
      </button>
      <button
        aria-label='prev'
        type='button'
        onClick={() => {
          swiper.slideNext();
        }}
      >
        <Image
          width={32}
          height={32}
          src='/images/slider-right-arrow.svg'
          alt=''
        />
      </button>
    </div>
  );
};
