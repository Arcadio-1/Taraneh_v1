import ArrowIcon, { Arrow } from "@/components/Util/icons/ArrowIcon";
import ShippingIcon from "@/components/Util/icons/ShippingIcon";
import TomanIcon from "@/components/Util/icons/TomanIcon";
import { numberSeperator } from "@/lib/util/price_formt";
import { OrderType } from "@/types/type";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
  order: OrderType;
}

const Shipping_summry = ({ order }: Props) => {
  const [showOrderSummry, setShowOrderSummry] = useState(false);
  return (
    <div className="border py-6 px-4 rounded-lg flex flex-col gap-3">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="text-lg font-iranyekan_bold">خلاصه سفارش</h1>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 text-dark_2 font-iranyekan_bold text-md">
              <ShippingIcon classes="fill-g1_5 h-8 w-8" />
              <div className="flex items-center gap-2">
                <p>{order.selectedDate.weekday}</p>
                <p>{order.selectedDate.day}</p>
                <p>{order.selectedDate.month_name}</p>
                <p> - </p>
                <p>بازده زمانی</p>
                <p className="font-iransansnum"> 9 - 22</p>
                <div className="bg-slate-300 py-1 px-2 text-sm rounded-full flex items-center justify-center gap-1">
                  <p className="font-iransansnum">{order.cart.size}</p>
                  <p className="">کالا</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 text-dark_4">
              <p>ارسال عادی</p>
              <p> - </p>
              <div className="flex">
                <p>هزینه ارسال : </p>
                <p className="font-iransansnum">
                  {numberSeperator(order.posting_price)}
                </p>
              </div>
            </div>
          </div>
          <div
            className="flex items-center gap-2"
            onClick={() => {
              setShowOrderSummry((prev) => {
                return (prev = !prev);
              });
            }}
          >
            <p>جزئیات مرسوله</p>
            <ArrowIcon classes="h-4 w-4 fill-dark_4" direction={Arrow.down} />
          </div>
        </div>
      </div>
      {showOrderSummry && (
        <div className="flex flex-col gap-3">
          <div
            className="flex
          gap-2"
          >
            {order.cart.items.map((item) => {
              return (
                <div
                  key={item.id}
                  className="border-l last:border-l-transparent"
                >
                  <Image
                    src={item.product.image_url}
                    alt={item.product.title}
                    width={70}
                    height={70}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex gap-2">
            <p>مبلغ مرسوله :</p>
            <div className="flex gap-1 items-center">
              <p className="font-iransansnum">
                {numberSeperator(order.cart.subTotalWithDiscount)}
              </p>
              <TomanIcon classes="h-4 w-4" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shipping_summry;
