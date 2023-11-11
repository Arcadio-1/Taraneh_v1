"use client";
import Image from "next/image";
import React from "react";
import emptyCartSvg from "@/assets/images/util/empty-cart.svg";
import Link from "next/link";
import ArrowIcon, { Arrow } from "@/components/Util/icons/ArrowIcon";
const EmptyCart = () => {
  return (
    <div className="grid items-center justify-center w-full">
      <div className="mx-auto w-full flex flex-col gap-2 items-center justify-center py-10 border rounded-xl my-2">
        <Image
          src={emptyCartSvg}
          width={200}
          height={200}
          alt="سبد شما خالی میباشد"
        />
        <p className="font-iranyekan_bold text-2xl">سبد خرید شما خالی است!</p>
        <Link
          className="text-g1_7 text-lg flex gap-1 items-center justify-center"
          href={"/main"}
        >
          مشاهده محصولات
          <ArrowIcon classes="h-5 w-5 fill-g1_7" direction={Arrow.left} />
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
