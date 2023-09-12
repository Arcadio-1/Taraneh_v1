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
}: Props) => {
  return (
    <div className="relative rounded-3xl bg-base-100 overflow-hidden p-2 shadow-md m-2 h-full w-[20rem] max-xl:w-[19rem] max-md:w-[18rem] transition-all duration-150 hover:scale-[1.015] hover:shadow-lg">
      <Link
        href={`/product/${id}`}
        className=" h-full grid grid-rows-3 items-stretch "
      >
        <ImageComponent image_url={image_url} title={title} />
        <div className="h-full flex flex-col">
          <Title title={title} />
          <Status type={selling_type} />
          <Rate rateNum={statistics.totalRate} />
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
