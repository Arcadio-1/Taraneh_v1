"use client";
import React, { useEffect, useState } from "react";
import Payment_method from "./payment_method/Payment_method";
import Submit_discount_code from "./submit_discount_code/Submit_discount_code";
import Submit_gift_cart from "./submit_gift_cart/Submit_gift_cart";
import Shipping_summry from "./shipping_summry/Shipping_summry";
import Payment_form from "./payment_form/Payment_form";
import { useGlobalContext } from "@/app/provider/Provider";
import { redirect } from "next/navigation";
import { Address_Full, ShoppingCart } from "@/types_validation/type";
import { PayMethod } from "@prisma/client";
import { Session } from "next-auth";

interface Props {
  cart: ShoppingCart;
  address: Address_Full;
  session: Session;
}

const Payment = ({ cart, address, session }: Props) => {
  const { deliveryDate, postingPrice } = useGlobalContext();

  const [paymentMethod, setPaymentMethod] = useState<PayMethod>(
    PayMethod.NOT_PAYED,
  );

  const paymentMethodHandler = (method: PayMethod) => {
    setPaymentMethod((prev) => {
      return (prev = method);
    });
  };

  useEffect(() => {
    if (!deliveryDate || !postingPrice) {
      redirect("/shipping");
    }
  }, [deliveryDate, postingPrice]);
  return (
    <div className="pb-[10rem] md:p-0">
      {deliveryDate && postingPrice && (
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="flex grow flex-col gap-4">
            <Payment_method
              onPaymentSet={paymentMethodHandler}
              paymentMethod={paymentMethod}
            />
            <Submit_discount_code />
            <Submit_gift_cart />
            <Shipping_summry cart={cart} />
          </div>
          <Payment_form
            address={address}
            cart={cart}
            session={session}
            paymentMethod={paymentMethod}
          />
        </div>
      )}
    </div>
  );
};

export default Payment;
