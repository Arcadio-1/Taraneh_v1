"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import { TImageList } from "@/util_functions/getListOfImages";

interface Props {
  images: TImageList[];
}

const ProdSubImages = ({ images }: Props) => {
  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: "#my-product-gallery",
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
    };
  }, []);

  return (
    <div
      className="pswp-gallery hidden w-full gap-2 lg:flex"
      id="my-product-gallery"
    >
      {images.map((image, index) => {
        return (
          <a
            href={image.largeURL}
            data-pswp-width={image.width}
            data-pswp-height={image.height}
            key={`my-product-gallery-${index}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center"
          >
            <Image
              key={index}
              src={image.thumbnailURL}
              alt={image.title}
              width={200}
              height={200}
            />
          </a>
        );
      })}
    </div>
  );
};

export default ProdSubImages;
