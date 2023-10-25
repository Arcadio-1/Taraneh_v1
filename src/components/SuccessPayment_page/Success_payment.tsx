"use client";
import { useGlobalContext } from "@/app/(provider)/Provider";
import { resetCart } from "@/lib/actions/manageCart";
import Link from "next/link";
import React, { useEffect } from "react";
import ArrowIcon, { Arrow } from "../Util/icons/ArrowIcon";

const Success_payment = () => {
  const { order, setOrder } = useGlobalContext();
  useEffect(() => {
    const reseter = async () => {
      if (order) {
        await resetCart(order.cart.id);
        setOrder(null);
      }
    };
    reseter();
  });
  return (
    <div className="flex p-5 border items-center justify-center h-[60vh] w-full">
      <div className="w-full sm:w-[30rem] md:w-[35rem] lg:w-[40rem] xl:w-[45rem] border rounded-lg">
        <div className="border-b text-center py-3 bg-success rounded-tl-lg rounded-tr-lg">
          <h1 className="text-light_2 font-iranyekan_bold ">
            سفارش شما با موفقیت ثبت شد
          </h1>
        </div>
        <div className="flex flex-col gap-2 py-4">
          <div className="px-4 border-b py-2 font-iranyekan_bold">
            <label>شماره پیگیری : </label>
            <span className="font-iransansnum text-xl">12356</span>
          </div>
          <div className="px-4">
            <Link
              href={"/profile"}
              className="flex items-center gap-1 text-g1_7 group "
            >
              مشاهده لیست سفارشات
              <ArrowIcon
                direction={Arrow.left}
                classes="h-4 w-4 fill-g1_7 group-hover:-translate-x-2"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success_payment;
