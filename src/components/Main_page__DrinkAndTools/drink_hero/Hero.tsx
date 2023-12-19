"use client";
import Image from "next/image";
import React from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import heroImage_1 from "@/assets/images/Drink_hero/1.jpg";
import heroImage_2 from "@/assets/images/Drink_hero/2.jpg";
import heroImage_3 from "@/assets/images/Drink_hero/3.jpg";

import { register } from "swiper/element/bundle";

register();

const Hero: React.FC = () => {
  const heroImages = [heroImage_1, heroImage_2, heroImage_3];

  return (
    <section className="">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={1}
        autoplay={true}
      >
        {heroImages.map((image, index) => {
          return (
            <SwiperSlide key={index} className="!h-auto">
              <div className="h-full">
                <Image
                  className="object-cover h-full w-full min-h-[256px]"
                  src={image}
                  alt="hero"
                  width={1920}
                  height={500}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Hero;
