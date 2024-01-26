"use client";
import Image from "next/image";
import React from "react";
import emptyCartSvg from "@/assets/images/util/empty-cart.svg";
import Link from "next/link";
import ArrowIcon, { Arrow } from "@/components/Util/ui/icons/ArrowIcon";
const EmptyCart = () => {
  return (
    <div className="grid w-full items-center justify-center">
      <div className="mx-auto my-2 flex w-full flex-col items-center justify-center gap-2 rounded-xl border py-10">
        <Image
          src={emptyCartSvg}
          width={200}
          height={200}
          alt="سبد شما خالی میباشد"
        />
        <p className="font-iranyekan_bold text-2xl">سبد خرید شما خالی است!</p>
        <Link
          className="flex items-center justify-center gap-1 text-lg text-g1_7"
          href={"/search"}
        >
          مشاهده محصولات
          <ArrowIcon classes="h-5 w-5 fill-g1_7" direction={Arrow.left} />
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
