import React, { useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import PhotoSwipeLightbox from "photoswipe/lightbox";

interface Props {
  product_title: string;
  product_image_url: string;
  subImages: StaticImageData[];
}

const ProdSubImages = ({
  product_image_url,
  product_title,
  subImages,
}: Props) => {
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
  const images = subImages.map((image, index) => {
    return {
      largeURL: `/image/assets/product-details/sub-main/${index + 1}.jpg`,
      thumbnailURL: image,
      width: 1500,
      height: 1500,
    };
  });

  return (
    <div className="flex w-full gap-2 pswp-gallery" id="my-product-gallery">
      <a
        href={product_image_url}
        data-pswp-width={1500}
        data-pswp-height={1500}
        key={`my-product-gallery-first`}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center"
      >
        <Image
          src={product_image_url}
          alt={product_title}
          width={200}
          height={200}
        />
      </a>
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
              // className="rounded-xl w-1/5 px-1"
              src={image.largeURL}
              alt={product_title}
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
