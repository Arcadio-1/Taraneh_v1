"use client";
import TomanIcon from "@/components/Util/icons/TomanIcon";
import { numberSeperator } from "@/lib/util/price_formt";
import { Divider } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ShoppingCart } from "@/types/type";
import { Session } from "next-auth";
import { OrderAddress } from "@prisma/client";
import { useGlobalContext } from "@/app/(provider)/Provider";
///////////////
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components_shadcn/ui/sheet";
import Delivey_date from "../Content/delivery_date/Delivey_date";

interface Props {
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
const Shipping_form = ({ address, user, cart }: Props) => {
  const [submitStatus, setSubmitStatus] = useState<Submit_status_Enum>(
    Submit_status_Enum.set_date
  );

  const { deliveryDate, setPostingPric } = useGlobalContext();

  const [mount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);
  const post_cost: number = 39000;

  const submit_orders = async () => {
    if (address && cart && cart.userId && deliveryDate) {
      setPostingPric(post_cost);
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
    if (!deliveryDate) {
      setSubmitStatus(Submit_status_Enum.set_date);
      return;
    }
    setSubmitStatus(Submit_status_Enum.ready);
  }, [address, deliveryDate, user]);

  return (
    <div className=" md:border rounded-lg min-w-[25rem] h-full py-6 px-4 flex flex-col items-stretch gap-4">
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
      <div className="hidden md:flex">
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
      <div className="fixed bottom-0 right-0 left-0 p-8 w-full flex gap-2 items-center justify-between shadow-[0px_1px_5px_rgba(0,0,0,0.40)] md:hidden bg-light_1">
        <div className="grow">
          {submitStatus === Submit_status_Enum.ready && (
            <Link
              onClick={() => submit_orders()}
              href={"payment"}
              className="flex items-center justify-center bg-g1_5 w-full py-3 rounded-lg text-light_1 font-iransansbold"
            >
              ثبت سفارش
            </Link>
          )}
          {mount && (
            <Sheet>
              <SheetTrigger asChild>
                {submitStatus !== Submit_status_Enum.ready && (
                  <div className="flex items-center justify-center border border-g1_5 text-g1_5 w-full py-3 rounded-lg  font-iransansbold select-none">
                    {submitStatus === Submit_status_Enum.set_date &&
                      "انتخاب زمان دریافت"}
                    {submitStatus === Submit_status_Enum.set_Addres &&
                      "لطفا آدرس خود را ثبت کنید"}
                    {submitStatus === Submit_status_Enum.set_personalInfo &&
                      "لطفا مشخصات خود را ثبت کنید"}
                  </div>
                )}
              </SheetTrigger>
              <SheetContent dir="ltr" side={"bottom"}>
                {/* <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when done.
                </SheetDescription>
              </SheetHeader> */}
                <Delivey_date sheeter={true} />
                {/* <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter> */}
              </SheetContent>
            </Sheet>
          )}
        </div>
        <div className="flex flex-col items-end gap-3 grow justify-between text-dark_3">
          <div className="flex items-center gap-2">
            <label className="font-iranyekan_bold font-bold text-lg text-dark_4">
              قابل پرداخت
            </label>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-iransansnum text-2xl font-bold">
              {numberSeperator(cart.subTotalWithDiscount + post_cost)}
            </span>
            <TomanIcon classes="h-8 w-8 fill-dark_1 " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping_form;
