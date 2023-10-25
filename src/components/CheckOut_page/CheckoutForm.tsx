import { numberSeperator } from "@/lib/util/price_formt";
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
    <div className=" md:border rounded-lg min-w-[25rem] h-full py-6 px-4 flex flex-col items-stretch gap-4">
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between text-dark_5">
          <div className="flex items-center gap-2">
            <label className="font-iranyekan_bold font-bold text-xl md:text-lg">
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
            <label className="font-iranyekan_bold font-bold text-xl md:text-lg text-dark-1">
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
              <label className="font-iranyekan_bold font-bold text-xl md:text-lg">
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
        className="hidden md:flex items-center justify-center bg-g1_5 w-full py-3 rounded-lg text-light_1 font-iransansbold"
      >
        ثبت سفارش
      </Link>
      <div className="fixed bottom-0 right-0 left-0 p-8 w-full flex gap-2 items-center justify-between shadow-[0px_1px_5px_rgba(0,0,0,0.40)] md:hidden bg-light_1">
        <Link
          href={"/shipping"}
          className="flex grow items-center justify-center bg-g1_5 py-5 text-xl rounded-lg text-light_1 font-iransansbold"
        >
          ثبت سفارش
        </Link>
        <div className="flex flex-col items-end gap-3 grow justify-between text-dark_3">
          <div className="flex items-center gap-2">
            <label className="font-iranyekan_bold font-bold text-lg text-dark_4">
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
