"use client";
import Control_amount from "@/components/Util/components/Control_amount";
import ShippingIcon from "@/components/Util/ui/icons/ShippingIcon";
import { ShoppingCart } from "@/types_validation/type";
import { urlMaker } from "@/util_functions/urlMaker";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  cart: ShoppingCart;
}

const Shipping_items = ({ cart }: Props) => {
  return (
    <div>
      <div className="flex items-center gap-4">
        <ShippingIcon className="h-10 w-10 fill-red-700" />
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-iranyekan_bold">ارسال عادی</h1>
            <p className="flex gap-2 rounded-xl bg-slate-100 px-3 py-3">
              <span className="font-iransansnum">{cart.size}</span>
              <span>کالا</span>
            </p>
          </div>
          <p className="flex gap-2">
            <span className="font-iransansnum">3</span>
            <span>روز</span>
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        {cart.items.map((item) => {
          return (
            <div
              key={item.id}
              className="border-l p-4 shadow-transparent last:border-transparent"
            >
              <Link
                href={`/product/${item.productId}/${urlMaker(item.product.title)}`}
              >
                <Image
                  src={item.product.image_url}
                  height={100}
                  width={100}
                  alt={item.product.title}
                />
              </Link>
              <Control_amount
                amount={item.quantity}
                product_id={item.productId}
                classess="shadow-transparent border"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shipping_items;
