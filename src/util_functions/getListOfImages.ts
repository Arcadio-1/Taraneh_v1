import dummyImage1 from "@/assets/images/product-details/dummy/1.jpg";
import dummyImage2 from "@/assets/images/product-details/dummy/2.jpg";
import dummyImage3 from "@/assets/images/product-details/dummy/3.jpg";
import dummyImage4 from "@/assets/images/product-details/dummy/4.jpg";
import { StaticImageData } from "next/image";

export type TImageList = {
  title: string;
  largeURL: string;
  thumbnailURL: StaticImageData | string;
  width: number;
  height: number;
};
export const getListOfImages = (
  product_image_url: string,
  product_title: string,
) => {
  const dummyImagesAssets = [
    dummyImage1,
    dummyImage2,
    dummyImage3,
    dummyImage4,
  ];
  const dummyImagesList: TImageList[] = dummyImagesAssets.map(
    (image, index) => {
      return {
        title: product_title,
        largeURL: `/image/assets/product-details/dummy/${index + 1}.jpg`,
        thumbnailURL: image,
        width: 1500,
        height: 1500,
      };
    },
  );
  const images: TImageList[] = [
    {
      title: product_title,
      width: 1500,
      height: 1500,
      thumbnailURL: product_image_url,
      largeURL: product_image_url,
    },
    ...dummyImagesList,
  ];

  return images;
};
