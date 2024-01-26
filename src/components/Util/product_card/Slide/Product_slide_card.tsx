"use client";
import React from "react";
import { Product } from "@prisma/client";
import Rate from "./components/Rate";
import Price from "./components/price/Price";
import Link from "next/link";
import Status from "./components/Status";
import ImageComponent from "./components/ImageComponent";
import Title from "./components/Title";
import { urlMaker } from "@/util_functions/urlMaker";
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
      className={`relative h-full overflow-hidden bg-light_1 shadow-md transition-all duration-150 hover:scale-[1.015] hover:shadow-lg ${
        index === 0 && "rounded-br-xl rounded-tr-xl"
      }`}
    >
      <Link
        href={`/product/${id}/${urlMaker(title)}`}
        className=" grid h-full grid-rows-3 p-3"
      >
        <ImageComponent image_url={image_url} title={title} />
        <div className="flex h-full flex-col justify-between py-2">
          <Title title={title} />
          <Status type={selling_type} />
          {/* <Rate rateNum={statistics.totalRate} /> */}
          {status ? (
            <Price price={price} off_percent={off_percent} />
          ) : (
            <p className="mb-3 mt-auto font-iranyekan_bold text-xl text-red-400">
              اتمام موجودی
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Product_slid_card;
