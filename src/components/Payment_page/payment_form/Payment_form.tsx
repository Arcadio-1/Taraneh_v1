import TomanIcon from "@/components/Util/icons/TomanIcon";
import { numberSeperator } from "@/lib/util/price_formt";
import { OrderType } from "@/types/type";
import { Divider } from "@mui/material";
import React from "react";
import { PayMethod } from "@prisma/client";
import { addOrder } from "@/lib/actions/manageOrders";
import { useRouter } from "next/navigation";
interface Props {
  order: OrderType;
}

const Payment_form = ({ order }: Props) => {
  const route = useRouter();
  const payHandler = async () => {
    if (order.payment_method !== PayMethod.NOT_PAYED) {
      console.log(order);
      await addOrder(order);
      route.push("/successPayment");
      // await resetCart(order.cart.id);
      // setOrder(null);
    }
  };

  return (
    <div className=" md:border rounded-lg min-w-[25rem] h-full py-6 px-4 flex flex-col items-stretch gap-4">
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between text-dark_5">
          <div className="flex items-center gap-2">
            <label className="font-iranyekan_bold font-bold text-md">
              قیمت کالا ها
            </label>
            <div>
              <span className="font-iranyekan_bold">(</span>
              <span className="font-iransansnum text-xl font-bold">
                {order.cart.size}
              </span>
              <span className="font-iranyekan_bold">)</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <span className="font-iransansnum text-xl font-bold">
              {numberSeperator(order.cart.subtotal)}
            </span>
            <TomanIcon classes="h-6 w-6 fill-dark_5" />
          </div>
        </div>
        <Divider />
        <div className="flex items-start justify-between text-dark_4">
          <div className="flex items-center gap-2">
            <label className="text-lg">هزینه ارسال</label>
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
              {numberSeperator(order.posting_price)}
            </span>
            <TomanIcon classes="h-6 w-6 fill-dark_5" />
          </div>
        </div>
        {!!order.cart.subDiscount && (
          <>
            <Divider />
            <div className="flex items-start justify-between text-dark_3">
              <div className="flex items-center gap-2">
                <label className="font-iranyekan_bold font-bold text-md">
                  تخفیف کالاها
                </label>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-iransansnum text-xl font-bold">
                  {numberSeperator(order.cart.subDiscount)}
                </span>
                <TomanIcon classes="h-6 w-6 " />
              </div>
            </div>
          </>
        )}
        <Divider />
        {!!order.cart.subDiscount && order.cart.subDiscount > 0 && (
          <div className="flex items-start justify-between text-g1_5">
            <div className="flex items-center gap-2">
              <label className="font-iranyekan_bold font-bold text-md">
                سود شما از خرید
              </label>
            </div>
            <div className="flex items-center gap-1">
              <p className="font-iransansnum text-xl font-bold flex gap-2">
                <span>
                  (
                  {Math.round(
                    order.cart.subDiscount / (order.cart.subtotal / 100)
                  )}
                  %)
                </span>
                <span className="">
                  {numberSeperator(order.cart.subDiscount)}
                </span>
              </p>

              <TomanIcon classes="h-6 w-6 fill-g1_5" />
            </div>
          </div>
        )}
        <div className="flex items-start justify-between text-dark_3">
          <div className="flex items-center gap-2">
            <label className="font-iranyekan_bold font-bold text-md">
              قابل پرداخت
            </label>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-iransansnum text-xl font-bold">
              {numberSeperator(order.final_price)}
            </span>
            <TomanIcon classes="h-6 w-6 " />
          </div>
        </div>
      </div>
      <button
        className="hidden md:flex items-center justify-center bg-g1_5 w-full py-3 rounded-lg text-light_1 font-iransansbold"
        onClick={payHandler}
      >
        {order.payment_method === PayMethod.NOT_PAYED
          ? "نحوه پرداخت را مشخص کنید"
          : "پرداخت"}
      </button>
      <div className="fixed bottom-0 right-0 left-0 p-8 w-full flex gap-2 items-center justify-between shadow-[0px_1px_5px_rgba(0,0,0,0.40)] md:hidden bg-light_1">
        <button
          className="flex grow items-center justify-center bg-g1_5 py-5 text-xl rounded-lg text-light_1 font-iransansbold"
          onClick={payHandler}
        >
          {order.payment_method === PayMethod.NOT_PAYED
            ? "نحوه پرداخت را مشخص کنید"
            : "پرداخت"}
        </button>
        <div className="flex flex-col items-end gap-3 grow justify-between text-dark_3">
          <div className="flex items-center gap-2">
            <label className="font-iranyekan_bold font-bold text-lg text-dark_4">
              ثابل پرداخت{" "}
            </label>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-iransansnum text-2xl font-bold">
              {numberSeperator(order.final_price)}
            </span>
            <TomanIcon classes="h-8 w-8 fill-dark_1 " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment_form;
