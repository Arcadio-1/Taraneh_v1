import TomanIcon from "@/components/Util/icons/TomanIcon";
import { numberSeperator } from "@/lib/util/price_formt";
import { Divider } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SlectedInterface } from "../Shipping";
import { ShoppingCart } from "@/types/type";
import { Session } from "next-auth";
import {
  OrderAddress,
  OrderCart,
  OrderStatus,
  OrderUser,
} from "@prisma/client";
import { useGlobalContext } from "@/app/(provider)/Provider";

interface Props {
  selectedDate: SlectedInterface | null;
  address: OrderAddress | null;
  user: Session;
  cart: ShoppingCart;
}
enum Submit_status_Enum {
  set_Addres,
  set_personalInfo,
  set_date,
  ready,
}
const Shipping_form = ({ selectedDate, address, user, cart }: Props) => {
  const [submitStatus, setSubmitStatus] = useState<Submit_status_Enum>(
    Submit_status_Enum.set_date
  );

  const { order, setOrder } = useGlobalContext();
  const post_cost: number = 39000;

  const submit_orders = async () => {
    if (address && cart && selectedDate && cart.userId) {
      setOrder((prev) => {
        return (prev = {
          payment_status: false,
          posting_price: post_cost,
          user: user.user as OrderUser,
          cart: cart as OrderCart,
          final_price: cart.subTotalWithDiscount + post_cost,
          address: address,
          selectedDate: selectedDate,
          status: OrderStatus.IN_STORE,
        });
      });
    }
  };
  useEffect(() => {
    if (!address) {
      setSubmitStatus(Submit_status_Enum.set_Addres);
      return;
    }
    if (!user.user.name) {
      setSubmitStatus(Submit_status_Enum.set_personalInfo);
      return;
    }
    if (!selectedDate) {
      setSubmitStatus(Submit_status_Enum.set_date);
      return;
    }
    setSubmitStatus(Submit_status_Enum.ready);
  }, [address, selectedDate, user]);

  return (
    <div className="border rounded-lg w-96 py-6 px-4 flex flex-col items-stretch gap-4 h-full">
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between text-dark_5">
          <div className="flex items-center gap-2">
            <label className="font-iranyekan_bold font-bold text-md text-lg">
              قیمت کالا ها
            </label>
            <div>
              <span className="font-iranyekan_bold">(</span>
              <span className="font-iransansnum text-xl font-bold">
                {cart.size}
              </span>
              <span className="font-iranyekan_bold">)</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-iransansnum text-xl font-bold">
              {numberSeperator(cart.subtotal)}
            </span>
            <TomanIcon classes="h-6 w-6 fill-dark_5" />
          </div>
        </div>
        <Divider />
        <div className="flex items-start justify-between text-dark_3">
          <div className="flex items-center gap-2">
            <label className="font-iranyekan_bold font-bold text-lg">
              هزینه ارسال
            </label>
            <p className="flex gap-1 bg-g1_6 bg-opacity-10 p-2 rounded-full">
              <span className="font-iransansnum text-md font-bold text-g1_6">
                1
              </span>
              <span className="font-iranyekan text-md font-bold text-g1_6">
                مرسوله
              </span>
            </p>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-iransansnum text-xl font-bold">
              {numberSeperator(post_cost)}
            </span>
            <TomanIcon classes="h-6 w-6 fill-dark_5" />
          </div>
        </div>
        <Divider />
        {cart.subDiscount && cart.subDiscount > 0 && (
          <div className="flex items-start justify-between text-g1_5">
            <div className="flex items-center gap-2">
              <label>
                <span className="font-iranyekan_bold font-bold text-lg">
                  سود شما از خرید
                </span>
              </label>
            </div>
            <div className="flex items-center gap-1">
              <p className="font-iransansnum text-xl font-bold flex gap-2">
                <span>
                  ({Math.round(cart.subDiscount / (cart.subtotal / 100))}%)
                </span>
                <span>{numberSeperator(cart.subDiscount)}</span>
              </p>
              <TomanIcon classes="h-6 w-6 fill-g1_5" />
            </div>
          </div>
        )}
        <div className="flex items-start justify-between text-dark_3">
          <div className="flex items-center gap-2">
            <label className="font-iranyekan_bold font-bold  text-lg">
              قابل پرداخت
            </label>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-iransansnum text-xl font-bold">
              {numberSeperator(cart.subTotalWithDiscount + post_cost)}
            </span>
            <TomanIcon classes="h-6 w-6 " />
          </div>
        </div>
      </div>
      {submitStatus !== Submit_status_Enum.ready && (
        <div className="flex items-center justify-center bg-g1_5 w-full py-3 rounded-lg text-light_1 font-iransansbold cursor-not-allowed select-none">
          {submitStatus === Submit_status_Enum.set_date &&
            "لطفا زمان دریافت را مشخص کنید"}
          {submitStatus === Submit_status_Enum.set_Addres &&
            "لطفا آدرس خود را ثبت کنید"}
          {submitStatus === Submit_status_Enum.set_personalInfo &&
            "لطفا مشخصات خود را ثبت کنید"}
        </div>
      )}
      {submitStatus === Submit_status_Enum.ready && (
        <Link
          onClick={() => submit_orders()}
          href={"payment"}
          className="flex items-center justify-center bg-g1_5 w-full py-3 rounded-lg text-light_1 font-iransansbold"
        >
          ثبت سفارش
        </Link>
      )}
    </div>
  );
};

export default Shipping_form;
