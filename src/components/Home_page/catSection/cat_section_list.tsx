"use client";
import { Specific_cat } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface Props {
  specificList: Specific_cat[];
}

const Cat_section_list = ({ specificList }: Props) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, Autoplay]}
      spaceBetween={2}
      slidesPerView={"auto"}
      className={`sliderSection-swiper w-full bg-slate-100 rounded-lg`}
      navigation
    >
      {specificList.map((specfic, index) => {
        return (
          <SwiperSlide
            key={specfic.id}
            id={specfic.id}
            className="p-5 !max-w-[18rem] !h-auto max-xl:!max-w-[16rem] max-md:!max-w-[15rem]"
          >
            <Link
              className="relative p-2 transition-all duration-150 hover:scale-[1.015] hover:shadow-lg  flex items-center border-2 border-g1_7 rounded-lg h-full flex-col justify-between gap-4"
              href={`#`}
            >
              <Image
                alt={specfic.label}
                src={specfic.single_image}
                width={80}
                height={80}
                // className="bg-red-400"
              />
              <span className="font-iransansbold">{specfic.title}</span>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Cat_section_list;
