"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
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

import heroImage_1 from "@/assets/images/Tools_hero/1.jpg";
import heroImage_2 from "@/assets/images/Tools_hero/2.jpg";
import heroImage_3 from "@/assets/images/Tools_hero/3.jpg";

import { register } from "swiper/element/bundle";

register();

const Hero: React.FC = () => {
  return (
    <section className="">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={1}
      >
        <SwiperSlide className="!h-auto">
          <div className="h-full">
            <Image
              className="object-cover h-full"
              src={heroImage_2}
              alt="hero"
              width={1920}
              height={500}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="!h-auto">
          <div className="h-full">
            <Image
              className="object-cover h-full"
              src={heroImage_1}
              alt="hero"
              width={1920}
              height={500}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="!h-auto">
          <div className="h-full">
            <Image
              className="object-cover h-full"
              src={heroImage_3}
              alt="hero"
              width={1920}
              height={500}
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Hero;
