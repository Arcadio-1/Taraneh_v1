"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import React from "react";

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Product } from "@prisma/client";
import HeroSlide, { Hero_slide_type } from "./hero_slide";
import Product_slid_card from "../product_card/Slide/Product_slid_card";

interface Props {
  products: Product[];
  bg_color: string;
  classes?: string;
  heroSlide?: Hero_slide_type;
}
const Products_Slider = ({ products, heroSlide, bg_color, classes }: Props) => {
  return (
    <section>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        spaceBetween={10}
        slidesPerView={"auto"}
        className={`sliderSection-swiper ${bg_color} ${classes}`}
        navigation
      >
        {!!heroSlide && (
          <SwiperSlide className="p-5 !max-w-[20rem] !h-auto max-xl:!max-w-[19rem] max-md:!max-w-[18rem]">
            <HeroSlide hero={heroSlide} bg_color={bg_color} />
          </SwiperSlide>
        )}
        {products.map((product) => {
          return (
            <SwiperSlide
              key={product.id}
              id={product.id}
              className="p-5 !max-w-[20rem] !h-auto max-xl:!max-w-[19rem] max-md:!max-w-[18rem]"
            >
              <Product_slid_card product={product} key={product.id} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Products_Slider;
