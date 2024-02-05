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
    <div className={`pswp-gallery !px-4 !py-2`} id="my-test-gallery">
      <div className="px-4">
        <a
          className=""
          href={images[0].largeURL}
          data-pswp-width={images[0].width}
          data-pswp-height={images[0].height}
          key={`my-test-gallery-first`}
          target="_blank"
          rel="noreferrer"
        >
          <div className="flex items-center justify-center">
            <Image
              className="w-full max-w-2xl rounded-lg"
              src={images[0].largeURL}
              width={300}
              height={300}
              alt={images[0].title}
            />
          </div>
        </a>
      </div>
    </div>
  );
};

export default MainImage;
