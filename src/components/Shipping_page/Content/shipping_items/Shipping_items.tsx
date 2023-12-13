"use client";
import Control_amount from "@/components/Product_page/main/order/Control_amount";
import ShippingIcon from "@/components/Util/icons/ShippingIcon";
import { ShoppingCart } from "@/types/type";
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
        <ShippingIcon classes="h-10 w-10 fill-red-700" />
        <div>
          <div className="flex gap-3 items-center">
            <h1 className="font-iranyekan_bold">ارسال عادی</h1>
            <p className="flex gap-2 px-3 py-3 bg-slate-100 rounded-xl">
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
              className="shadow-transparent border-l last:border-transparent p-4"
            >
              <Link href={`/product/${item.productId}`}>
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
