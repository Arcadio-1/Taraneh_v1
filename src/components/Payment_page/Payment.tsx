"use client";
import React, { useEffect } from "react";
import Payment_method from "./payment_method/Payment_method";
import Submit_discount_code from "./submit_discount_code/Submit_discount_code";
import Submit_gift_cart from "./submit_gift_cart/Submit_gift_cart";
import Shipping_summry from "./shipping_summry/Shipping_summry";
import Payment_form from "./payment_form/Payment_form";
import { useGlobalContext } from "@/app/(provider)/Provider";
import { redirect } from "next/navigation";

const Payment = () => {
  const { order, setOrder } = useGlobalContext();

  useEffect(() => {
    if (!order) {
      redirect("/shipping");
    }
  }, [order]);

  return (
    <div>
      <div>
        <Payment_method />
        <Submit_discount_code />
        <Submit_gift_cart />
        <Shipping_summry />
      </div>
      <Payment_form />
    </div>
  );
};

export default Payment;
