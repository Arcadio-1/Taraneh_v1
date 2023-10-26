"use client";
import React, { useEffect, useState } from "react";
import Payment_method from "./payment_method/Payment_method";
import Submit_discount_code from "./submit_discount_code/Submit_discount_code";
import Submit_gift_cart from "./submit_gift_cart/Submit_gift_cart";
import Shipping_summry from "./shipping_summry/Shipping_summry";
import Payment_form from "./payment_form/Payment_form";
import { useGlobalContext } from "@/app/(provider)/Provider";
import { redirect } from "next/navigation";
import { OrderType, ShoppingCart } from "@/types/type";
import { OrderCart, PayMethod } from "@prisma/client";

interface Props {
  cart: ShoppingCart;
}

const Payment = ({ cart }: Props) => {
  const { order, setOrder } = useGlobalContext();
  const [paymentMethod, setPaymentMethod] = useState<PayMethod>(
    PayMethod.NOT_PAYED
  );
  const paymentMethodHandler = (method: PayMethod) => {
    setPaymentMethod((prev) => {
      return (prev = method);
    });
    if (order && order.cart && order.cart.items) {
      setOrder((prev) => {
        return (prev = {
          user_id: order.user_id,
          payment_status: false,
          payment_method: method,
          posting_price: order.posting_price,
          user: order.user,
          cart: order.cart,
          final_price: order.final_price,
          address: order.address,
          selectedDate: order.selectedDate,
          status: order.status,
        });
      });
    }
  };

  useEffect(() => {
    if (!order) {
      redirect("/shipping");
    }
    const orderCart1 = JSON.stringify(order.cart);
    const orderCart2 = JSON.stringify(cart);
    if (orderCart1 !== orderCart2) {
      console.log("OK");
      // redirect("/shipping");
    }
  }, [order, cart]);
  return (
    <div className="pb-[10rem] md:p-0">
      {order && (
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex flex-col gap-4 grow">
            <Payment_method
              onPaymentSet={paymentMethodHandler}
              paymentMethod={paymentMethod}
            />
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
