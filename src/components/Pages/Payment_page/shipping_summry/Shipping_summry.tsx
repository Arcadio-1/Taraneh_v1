import { useGlobalContext } from "@/app/provider/Provider";
import ArrowIcon, { Arrow } from "@/components/Util/ui/icons/ArrowIcon";
import ShippingIcon from "@/components/Util/ui/icons/ShippingIcon";
import TomanIcon from "@/components/Util/ui/icons/TomanIcon";
import { numberSeperator } from "@/util_functions/price_formt";
import { OrderType, ShoppingCart } from "@/types_validation/type";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
  cart: ShoppingCart;
}

const Shipping_summry = ({ cart }: Props) => {
  const { deliveryDate, postingPrice } = useGlobalContext();

  const [showOrderSummry, setShowOrderSummry] = useState(false);
  return (
    <div className="flex flex-col gap-3 rounded-lg border px-4 py-6">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="font-iranyekan_bold text-lg">خلاصه سفارش</h1>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-3">
            <div className="text-md flex items-center gap-3 font-iranyekan_bold text-dark_2">
              <ShippingIcon className="h-8 w-8 fill-g1_5" />
              <div className="flex items-center gap-2">
                <p>{deliveryDate!.weekday}</p>
                <p>{deliveryDate!.day}</p>
                <p>{deliveryDate!.month_name}</p>
                <p> - </p>
                <p>بازده زمانی</p>
                <p className="font-iransansnum"> 9 - 22</p>
                <div className="flex items-center justify-center gap-1 rounded-full bg-slate-300 px-2 py-1 text-sm">
                  <p className="font-iransansnum">{cart.size}</p>
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
                  {numberSeperator(postingPrice)}
                </p>
              </div>
            </div>
          </div>
          <div
            className="flex cursor-pointer items-center gap-2"
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
            {cart.items.map((item) => {
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
            <div className="flex items-center gap-1">
              <p className="font-iransansnum">
                {numberSeperator(cart.subTotalWithDiscount)}
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
