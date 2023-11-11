import DotIcon from "@/components/Util/icons/DotIcon";
import TomanIcon from "@/components/Util/icons/TomanIcon";
import { numberSeperator } from "@/lib/util/price_formt";
import { PayMethod } from "@prisma/client";
import React from "react";

interface Props {
  final_price: number;
  subDiscount: number;
  payment_method: PayMethod;
  posting_price: number;
}

const PaymentDetials = ({
  final_price,
  subDiscount,
  posting_price,
  payment_method,
}: Props) => {
  return (
    <div className="flex flex-col gap-5 p-4">
      <div className="flex items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-dark_5"> مبلغ</label>
            <p className="flex gap-1 items-center">
              <span className="text-dark_1 font-bold font-iransansnum text-xl">
                {numberSeperator(final_price)}
              </span>
              <TomanIcon classes="h-5 w-5 fill-dark_2" />
            </p>
          </div>
          {!!subDiscount && (
            <>
              <DotIcon classes=" h-2 w-2 fill-dark_5" />
              <div className="flex gap-2">
                <label className="text-dark_5"> سود شما از خرید</label>
                <p className="flex gap-1 items-center">
                  <span className="text-dark_1 font-bold font-iransansnum text-xl">
                    {numberSeperator(subDiscount)}
                  </span>
                  <TomanIcon classes="h-5 w-5 fill-dark_2" />
                </p>
              </div>
            </>
          )}
          <DotIcon classes=" h-2 w-2 fill-dark_5" />
          <span className="text-dark_4 font-bold font-iranyekan_bold text-lg">
            {payment_method === PayMethod.BANK_CART && "پرداخت اینترنتی"}
            {payment_method === PayMethod.CRIDIT && "پرداخت اعتباری"}
            {payment_method === PayMethod.ORGANAZATION_CRIDIT &&
              "پرداخت اعتبار حقوقی"}
            {payment_method === PayMethod.POS && "پرداخت حضوری"}
          </span>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <label className="text-dark_5">
              هزینه ارسال (بر اساس وزن و حجم)
            </label>
            <div className="text-dark_1 font-bold">
              {posting_price && (
                <div className="flex items-center gap-2">
                  <span className="font-iransansnum text-xl text-dark_3">
                    {numberSeperator(posting_price)}
                  </span>
                  <TomanIcon classes="h-5 w-5 fill-dark_2" />
                </div>
              )}
              {!posting_price && <span>رایگان</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetials;
