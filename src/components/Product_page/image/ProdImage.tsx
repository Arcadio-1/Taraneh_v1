"use client";
import Image from "next/image";
import React from "react";

import ProdMenu from "./ProdMenu";
import ProdSubImages from "./ProdSubImages";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import { useEffect } from "react";
import { useWindowSize } from "@uidotdev/usehooks";

import sumImage1 from "@/assets/images/product-details/sub-main/1.jpg";
import sumImage2 from "@/assets/images/product-details/sub-main/2.jpg";
import sumImage3 from "@/assets/images/product-details/sub-main/3.jpg";
import sumImage4 from "@/assets/images/product-details/sub-main/4.jpg";
const subImages = [sumImage1, sumImage2, sumImage3, sumImage4];

interface Props {
  product_image_url: string;
  product_title: string;
}

const ProdImage = ({ product_image_url, product_title }: Props) => {
  const { width } = useWindowSize();
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
  }, [width]);
  const images = subImages.map((image, index) => {
    return {
      largeURL: `/image/assets/product-details/sub-main/${index + 1}.jpg`,
      thumbnailURL: image,
      width: 1500,
      height: 1500,
    };
  });

  return (
    <>
      {width && width > 1023 ? (
        <div className="relative overflow-hidden flex flex-col items-center justify-center">
          <Image
            src={product_image_url}
            alt={product_title}
            width={400}
            height={400}
          />
          <ProdMenu />
          <ProdSubImages
            subImages={subImages}
            product_image_url={product_image_url}
            product_title={product_title}
          />
        </div>
      ) : (
        <div className="productDetails-image-mainImage">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={"auto"}
            id="my-test-gallery"
            className="pswp-gallery"
            pagination={{
              dynamicBullets: true,
            }}
          >
            <SwiperSlide>
              <a
                href={product_image_url}
                data-pswp-width={1500}
                data-pswp-height={1500}
                key={`my-test-gallery-first`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center"
              >
                <Image
                  src={product_image_url}
                  width={300}
                  height={300}
                  alt={product_title}
                />
              </a>
            </SwiperSlide>
            {images.map((image, index) => {
              return (
                <SwiperSlide key={index}>
                  <a
                    href={image.largeURL}
                    data-pswp-width={image.width}
                    data-pswp-height={image.height}
                    key={`my-test-gallery-${index}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center"
                  >
                    <Image
                      src={image.largeURL}
                      width={300}
                      height={300}
                      alt={product_title}
                    />
                  </a>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default ProdImage;
