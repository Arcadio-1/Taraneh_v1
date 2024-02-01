"use client";
import React, { useEffect } from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "swiper/css";
import "swiper/css/pagination";
import { TImageList } from "@/util_functions/getListOfImages";

interface Props {
  images: TImageList[];
}

const MainImage = ({ images }: Props) => {
  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: "#my-test-gallery",
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
    };
  }, []);

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      pagination={{ clickable: true }}
      spaceBetween={20}
      slidesPerView={"auto"}
      className={`sliderSection-swiper pswp-gallery !px-4 !py-2`}
      id="my-test-gallery"
    >
      {images.map((image, index) => {
        return (
          <SwiperSlide className="px-4" key={index}>
            <a
              className=""
              href={image.largeURL}
              data-pswp-width={image.width}
              data-pswp-height={image.height}
              key={`my-test-gallery-first`}
              target="_blank"
              rel="noreferrer"
            >
              <div className="flex items-center justify-center">
                <Image
                  className="w-full max-w-2xl rounded-lg"
                  src={image.largeURL}
                  width={300}
                  height={300}
                  alt={image.title}
                />
              </div>
            </a>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default MainImage;
