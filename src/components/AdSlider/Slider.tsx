"use client";
import React from "react";
import Product_slid_card from "../product_card/Product_slid_card";

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { AdWithProducts } from "@/types/type";

interface Props {
  products: AdWithProducts[];
}
const Slider = ({ products }: Props) => {
  return (
    <section>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        spaceBetween={10}
        slidesPerView={"auto"}
        className="sliderSection-swiper"
        navigation
      >
        {products.map((product) => {
          return (
            <SwiperSlide
              key={product.product_id}
              id={product.id}
              className="p-5 !max-w-[20rem] !h-auto max-xl:!max-w-[19rem] max-md:!max-w-[18rem]"
            >
              <Product_slid_card
                key={product.product_id}
                product={product.product}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Slider;
