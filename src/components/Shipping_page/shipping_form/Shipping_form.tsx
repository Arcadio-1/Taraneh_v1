"use client";
import TomanIcon from "@/components/Util/icons/TomanIcon";
import { numberSeperator } from "@/util_functions/price_formt";
import { Divider } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ShoppingCart } from "@/types_validation/type";
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
    Submit_status_Enum.set_date,
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
    <div className=" flex h-full min-w-[25rem] flex-col items-stretch gap-4 rounded-lg px-4 py-6 md:border">
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between text-dark_5">
          <div className="flex items-center gap-2">
            <label className="text-md font-iranyekan_bold text-lg font-bold">
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
            <label className="font-iranyekan_bold text-lg font-bold">
              هزینه ارسال
            </label>
            <p className="flex gap-1 rounded-full bg-g1_6 bg-opacity-10 p-2">
              <span className="text-md font-iransansnum font-bold text-g1_6">
                1
              </span>
              <span className="text-md font-iranyekan font-bold text-g1_6">
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
                <span className="font-iranyekan_bold text-lg font-bold">
                  سود شما از خرید
                </span>
              </label>
            </div>
            <div className="flex items-center gap-1">
              <p className="flex gap-2 font-iransansnum text-xl font-bold">
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
            <label className="font-iranyekan_bold text-lg  font-bold">
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
          <div className="flex w-full cursor-not-allowed select-none items-center justify-center rounded-lg bg-g1_5 py-3 font-iransansbold text-light_1">
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
            className="flex w-full items-center justify-center rounded-lg bg-g1_5 py-3 font-iransansbold text-light_1"
          >
            ثبت سفارش
          </Link>
        )}
      </div>
      <div className="fixed bottom-0 left-0 right-0 flex w-full items-center justify-between gap-2 bg-light_1 p-8 shadow-[0px_1px_5px_rgba(0,0,0,0.40)] md:hidden">
        <div className="grow">
          {mount && (
            <Sheet>
              {submitStatus === Submit_status_Enum.ready && (
                <div>
                  <SheetTrigger asChild>
                    <button className="flex w-full select-none items-center justify-center rounded-lg border border-g1_5 py-3  font-iransansbold text-g1_5">
                      ویرایش زمان ارسال
                    </button>
                  </SheetTrigger>
                  <Link
                    onClick={() => submit_orders()}
                    href={"payment"}
                    className="flex w-full items-center justify-center rounded-lg bg-g1_5 py-3 font-iransansbold text-light_1"
                  >
                    ثبت سفارش
                  </Link>
                </div>
              )}
              {submitStatus !== Submit_status_Enum.ready && (
                <SheetTrigger asChild>
                  <button className="flex w-full select-none items-center justify-center rounded-lg border border-g1_5 py-3  font-iransansbold text-g1_5">
                    {submitStatus === Submit_status_Enum.set_date &&
                      "انتخاب زمان دریافت"}
                    {submitStatus === Submit_status_Enum.set_Addres &&
                      "لطفا آدرس خود را ثبت کنید"}
                    {submitStatus === Submit_status_Enum.set_personalInfo &&
                      "لطفا مشخصات خود را ثبت کنید"}
                  </button>
                </SheetTrigger>
              )}
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
        <div className="flex grow flex-col items-end justify-between gap-3 text-dark_3">
          <div className="flex items-center gap-2">
            <label className="font-iranyekan_bold text-lg font-bold text-dark_4">
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
