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
}

const Product_grid_card = ({
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
    <div className="relative bg-base-100 overflow-hidden h-full transition-all duration-150 hover:scale-[1.015] hover:shadow-lg p-1">
      <Link
        href={`/product/${id}`}
        className=" h-full grid grid-cols-2 grid-rows-2 items-stretch sm:grid-rows-3 sm:grid-cols-1 sm:grid sm:place-items-center "
      >
        <ImageComponent image_url={image_url} title={title} />
        <div className="h-full w-full flex flex-col mt-auto row-span-2 justify-end ">
          <Status type={selling_type} />
          <div className="grid grid-rows-2 my-auto h-2/3 px-2 gap-16">
            <div className="flx flex-col">
              <Title title={title} />
              <Rate rateNum={statistics.totalRate} />
            </div>
            <div>
              {status ? (
                <Price price={price} off_percent={off_percent} />
              ) : (
                <p className="font-iranyekan_bold text-xl">اتمام موجودی</p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product_grid_card;
