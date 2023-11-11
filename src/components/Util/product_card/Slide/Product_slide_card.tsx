"use client";
import React from "react";
import { Product } from "@prisma/client";
import Rate from "./components/Rate";
import Price from "./components/price/Price";
import Link from "next/link";
import Status from "./components/Status";
import ImageComponent from "./components/ImageComponent";
import Title from "./components/Title";
interface Props {
  product: Product;
  index: number;
}

const Product_slid_card = ({
  product: {
    title,
    status,
    selling_type,
    statistics,
    price,
    off_percent,
    image_url,
    id,
  },
  index,
}: Props) => {
  return (
    <div
      className={`relative bg-light_1 overflow-hidden p-2 shadow-md h-full w-[18rem] max-xl:w-[16rem] max-md:w-[15rem] transition-all duration-150 hover:scale-[1.015] hover:shadow-lg ${
        index === 0 && "rounded-tr-xl rounded-br-xl"
      }`}
    >
      <Link href={`/product/${id}`} className=" h-full grid grid-rows-3">
        <ImageComponent image_url={image_url} title={title} />
        <div className="h-full flex flex-col justify-end">
          {/* <Title title={title} /> */}
          <Status type={selling_type} />
          {/* <Rate rateNum={statistics.totalRate} /> */}
          {status ? (
            <Price price={price} off_percent={off_percent} />
          ) : (
            <p className="font-iranyekan_bold text-xl text-red-400 mt-auto mb-3">
              اتمام موجودی
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Product_slid_card;
