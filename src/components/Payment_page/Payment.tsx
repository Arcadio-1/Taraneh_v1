"use client";
import React, { useEffect } from "react";
import Payment_method from "./payment_method/Payment_method";
import Submit_discount_code from "./submit_discount_code/Submit_discount_code";
import Submit_gift_cart from "./submit_gift_cart/Submit_gift_cart";
import Shipping_summry from "./shipping_summry/Shipping_summry";
import Payment_form from "./payment_form/Payment_form";
import { useGlobalContext } from "@/app/(provider)/Provider";
import { redirect } from "next/navigation";
import { ShoppingCart } from "@/types/type";

interface Props {
  cart: ShoppingCart;
}

const Payment = ({ cart }: Props) => {
  const { order, setOrder } = useGlobalContext();

  useEffect(() => {
    if (!order) {
      redirect("/shipping");
    }
    const orderCart1 = JSON.stringify(order.cart);
    const orderCart2 = JSON.stringify(cart);
    if (orderCart1 !== orderCart2) {
      redirect("/shipping");
    }
  }, [order, cart]);
  return (
    <div>
      {order && (
        <div className="flex gap-2">
          <div className="flex flex-col gap-4 grow">
            <Payment_method />
            <Submit_discount_code />
            <Submit_gift_cart />
            <Shipping_summry order={order} />
          </div>
          <Payment_form order={order} />
        </div>
      )}
    </div>
  );
};

export default Payment;
