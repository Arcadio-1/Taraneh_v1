import React from "react";
import ProdMenu from "./components/ProdMenu";
import ProdSubImages from "./components/ProdSubImages";
import MainImage from "./components/MainImage";
import "photoswipe/style.css";
import { getListOfImages } from "@/util_functions/getListOfImages";
interface Props {
  product_image_url: string;
  product_title: string;
}

const ProdImage = ({ product_image_url, product_title }: Props) => {
  const imageList = getListOfImages(product_image_url, product_title);
  return (
    <div className="relative flex h-auto flex-col items-center justify-start overflow-hidden">
      <MainImage images={imageList} />
      <ProdMenu />
      <ProdSubImages images={imageList} />
    </div>
  );
};

export default ProdImage;
