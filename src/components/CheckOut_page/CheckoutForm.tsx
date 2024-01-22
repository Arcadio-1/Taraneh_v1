import { numberSeperator } from "@/util_functions/price_formt";
import React from "react";
import TomanIcon from "../Util/icons/TomanIcon";
import Link from "next/link";

interface Props {
  subtotal: number;
  subDiscount: number;
  cartSize: number;
  subtotalWithDiscount: number;
}
const CheckoutForm = ({
  cartSize,
  subtotal,
  subDiscount,
  subtotalWithDiscount,
}: Props) => {
  return (
    <div className=" flex h-full min-w-[25rem] flex-col items-stretch gap-4 rounded-lg px-4 py-6 md:border">
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between text-dark_5">
          <div className="flex items-center gap-2">
            <label className="font-iranyekan_bold text-xl font-bold md:text-lg">
              قیمت کالا ها
            </label>
            <div>
              <span className="font-iranyekan_bold">(</span>
              <span className="font-iransansnum text-xl font-bold">
                {cartSize}
              </span>
              <span className="font-iranyekan_bold">)</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-iransansnum text-xl font-bold">
              {numberSeperator(subtotal)}
            </span>
            <TomanIcon classes="h-6 w-6 fill-dark_5" />
          </div>
        </div>
        <div className="flex items-start justify-between text-dark_3">
          <div className="flex items-center gap-2">
            <label className="text-dark-1 font-iranyekan_bold text-xl font-bold md:text-lg">
              جمع سبد خرید
            </label>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-iransansnum text-xl font-bold">
              {numberSeperator(subtotalWithDiscount)}
            </span>
            <TomanIcon classes="h-6 w-6 " />
          </div>
        </div>
        {!!subDiscount && subDiscount > 0 && (
          <div className="flex items-start justify-between text-g1_5">
            <div className="flex items-center gap-2">
              <label className="font-iranyekan_bold text-xl font-bold md:text-lg">
                سود شما از خرید
              </label>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-iransansnum text-xl font-bold">
                {numberSeperator(subDiscount)}
              </span>
              <TomanIcon classes="h-6 w-6 fill-g1_5" />
            </div>
          </div>
        )}
      </div>
      <Link
        href={"/shipping"}
        className="hidden w-full items-center justify-center rounded-lg bg-g1_5 py-3 font-iransansbold text-light_1 md:flex"
      >
        ثبت سفارش
      </Link>
      <div className="fixed bottom-0 left-0 right-0 flex w-full items-center justify-between gap-2 bg-light_1 p-8 shadow-[0px_1px_5px_rgba(0,0,0,0.40)] md:hidden">
        <Link
          href={"/shipping"}
          className="flex grow items-center justify-center rounded-lg bg-g1_5 py-5 font-iransansbold text-xl text-light_1"
        >
          ثبت سفارش
        </Link>
        <div className="flex grow flex-col items-end justify-between gap-3 text-dark_3">
          <div className="flex items-center gap-2">
            <label className="font-iranyekan_bold text-lg font-bold text-dark_4">
              جمع سبد خرید
            </label>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-iransansnum text-2xl font-bold">
              {numberSeperator(subtotalWithDiscount)}
            </span>
            <TomanIcon classes="h-8 w-8 fill-dark_1 " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
