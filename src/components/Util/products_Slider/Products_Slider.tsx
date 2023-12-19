"use client";
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
import Product_slide_card from "../product_card/Slide/Product_slide_card";
import LastSlide from "./lastSlide";

interface Props {
  products: Product[];
  bg_color: string;
  classes?: string;
  heroSlide?: Hero_slide_type;
  lastSlide_bg_color?: string;
}
const Products_Slider = ({
  products,
  heroSlide,
  bg_color,
  classes,
  lastSlide_bg_color,
}: Props) => {
  return (
    <section>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        spaceBetween={2}
        slidesPerView={"auto"}
        className={`sliderSection-swiper ${bg_color} ${classes} !px-4`}
        navigation
      >
        {!!heroSlide && (
          <SwiperSlide className="py-5 !max-w-[16rem] md:!max-w-[18rem] !h-auto">
            <HeroSlide hero={heroSlide} bg_color={bg_color} />
          </SwiperSlide>
        )}
        {products.map((product, index) => {
          return (
            <SwiperSlide
              key={product.id}
              id={product.id}
              className="py-5 !max-w-[16rem] md:!max-w-[18rem] !h-auto"
            >
              <Product_slide_card
                index={index}
                product={product}
                key={product.id}
              />
            </SwiperSlide>
          );
        })}
        <SwiperSlide className="py-5 !max-w-[16rem] md:!max-w-[18rem] !h-auto">
          <LastSlide link_url="#" bg_color={lastSlide_bg_color} />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Products_Slider;
