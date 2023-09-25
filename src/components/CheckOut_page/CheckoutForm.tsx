import { numberSeperator } from "@/lib/util/price_formt";
import React from "react";
import TomanIcon from "../Util/icons/TomanIcon";

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
    <div className="border rounded-lg w-96 py-6 px-4 flex flex-col items-stretch gap-4">
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between text-dark_5">
          <div className="flex items-center gap-2">
            <label className="font-iranyekan_bold font-bold text-md">
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
            <label className="font-iranyekan_bold font-bold text-md">
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
        {subDiscount && subDiscount > 0 && (
          <div className="flex items-start justify-between text-g1_5">
            <div className="flex items-center gap-2">
              <label className="font-iranyekan_bold font-bold text-md">
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
      <button className="bg-g1_5 w-full py-3 rounded-lg text-light_1 font-iransansbold">
        ثبت سفارش
      </button>
    </div>
  );
};

export default CheckoutForm;
