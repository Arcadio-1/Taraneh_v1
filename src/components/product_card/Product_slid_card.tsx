"use client";
import React from "react";
import { Product } from "@prisma/client";
import Rate from "./components/Rate";
import Price from "./components/price/Price";
import Link from "next/link";
import Status from "./components/Status";
import ImageComponent from "./components/Image";
import Title from "./components/Title";
interface Props {
  product: Product;
}

const Product_slid_card = ({ product }: Props) => {
  return (
    <div className="relative rounded-3xl bg-base-100 overflow-hidden p-2 shadow-md m-2 h-full w-[20rem] max-xl:w-[19rem] max-md:w-[18rem] transition-all duration-150 hover:scale-105 hover:shadow-lg">
      <Link href={"#"} className=" h-full grid grid-rows-3 items-stretch ">
        <ImageComponent image_url={product.image_url} title={product.title} />
        <div className="h-full flex flex-col">
          <Title title={product.title} />
          <Status type={product.selling_type} />
          <Rate rateNum={product.statistics.totalRate} />
          <Price price={product.price} off_percent={product.off_percent} />
        </div>
      </Link>
    </div>
  );
};

export default Product_slid_card;
