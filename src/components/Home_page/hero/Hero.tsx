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

import heroImage_1 from "@/assets/images/Hero/1.jpg";
import heroImage_3 from "@/assets/images/Hero/3.jpg";

import { register } from "swiper/element/bundle";

register();

const Hero: React.FC = () => {
  const hero_Images = [heroImage_1, heroImage_3];
  return (
    <section className="">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={1}
        autoplay={true}
      >
        {hero_Images.map((hero_image, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="h-full min-h-[256px]">
                <Image
                  src={hero_image}
                  alt="hero "
                  width={1920}
                  height={700}
                  className="object-cover h-full w-full min-h-[256px]"
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
