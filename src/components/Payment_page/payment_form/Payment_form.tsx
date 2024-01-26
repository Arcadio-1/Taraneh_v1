import TomanIcon from "@/components/Util/icons/TomanIcon";
import { numberSeperator } from "@/util_functions/price_formt";
import { Address_Full, OrderType, ShoppingCart } from "@/types_validation/type";
import { Divider } from "@mui/material";
import React from "react";
import { OrderCart, OrderStatus, PayMethod } from "@prisma/client";
import { addOrder } from "@/actions/manageOrders";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { useGlobalContext } from "@/app/(provider)/Provider";
interface Props {
  cart: ShoppingCart;
  address: Address_Full;
  session: Session;
  paymentMethod: PayMethod;
}

const Payment_form = ({ paymentMethod, address, cart, session }: Props) => {
  const { postingPrice, deliveryDate } = useGlobalContext();
  const route = useRouter();
  const payHandler = async () => {
    if (
      session &&
      session.user.name &&
      session.user.family &&
      deliveryDate &&
      cart.userId
    ) {
      if (paymentMethod !== PayMethod.NOT_PAYED && cart.userId) {
        const orderr: OrderType = {
          user_id: session.user.id,
          payment_status: true,
          payment_method: paymentMethod,
          posting_price: postingPrice,
          user: {
            id: session.user.id,
            name: session.user.name,
            family: session.user.family,
            code_meli: session.user.code_meli,
            email: session.user.email,
            image: session.user.image,
            phone: session.user.phone,
          },
          cart: cart as OrderCart,
          final_price: cart.subTotalWithDiscount + postingPrice,
          address: address,
          selectedDate: deliveryDate,
          status: OrderStatus.NOT_CONFIRMED,
        };
        const orderAdder = await addOrder(orderr);
        if (orderAdder) {
          route.push(`/successPayment?tracking_code=${orderAdder.id}`);
        }
      }
    }
  };

  return (
    <div className=" flex h-full min-w-[25rem] flex-col items-stretch gap-4 rounded-lg px-4 py-6 md:border">
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between text-dark_5">
          <div className="flex items-center gap-2">
            <label className="text-md font-iranyekan_bold font-bold">
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
        <div className="flex items-start justify-between text-dark_4">
          <div className="flex items-center gap-2">
            <label className="text-lg">هزینه ارسال</label>
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
              {numberSeperator(postingPrice)}
            </span>
            <TomanIcon classes="h-6 w-6 fill-dark_5" />
          </div>
        </div>
        {!!cart.subDiscount && (
          <>
            <Divider />
            <div className="flex items-start justify-between text-dark_3">
              <div className="flex items-center gap-2">
                <label className="text-md font-iranyekan_bold font-bold">
                  تخفیف کالاها
                </label>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-iransansnum text-xl font-bold">
                  {numberSeperator(cart.subDiscount)}
                </span>
                <TomanIcon classes="h-6 w-6 " />
              </div>
            </div>
          </>
        )}
        <Divider />
        {!!cart.subDiscount && cart.subDiscount > 0 && (
          <div className="flex items-start justify-between text-g1_5">
            <div className="flex items-center gap-2">
              <label className="text-md font-iranyekan_bold font-bold">
                سود شما از خرید
              </label>
            </div>
            <div className="flex items-center gap-1">
              <p className="flex gap-2 font-iransansnum text-xl font-bold">
                <span>
                  ({Math.round(cart.subDiscount / (cart.subtotal / 100))}
                  %)
                </span>
                <span className="">{numberSeperator(cart.subDiscount)}</span>
              </p>

              <TomanIcon classes="h-6 w-6 fill-g1_5" />
            </div>
          </div>
        )}
        <div className="flex items-start justify-between text-dark_3">
          <div className="flex items-center gap-2">
            <label className="text-md font-iranyekan_bold font-bold">
              قابل پرداخت
            </label>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-iransansnum text-xl font-bold">
              {numberSeperator(cart.subTotalWithDiscount + postingPrice)}
            </span>
            <TomanIcon classes="h-6 w-6 " />
          </div>
        </div>
      </div>
      <button
        className="hidden w-full items-center justify-center rounded-lg bg-g1_5 py-3 font-iransansbold text-light_1 md:flex"
        onClick={payHandler}
      >
        {paymentMethod === PayMethod.NOT_PAYED
          ? "نحوه پرداخت را مشخص کنید"
          : "پرداخت"}
      </button>
      <div className="fixed bottom-0 left-0 right-0 flex w-full items-center justify-between gap-2 bg-light_1 p-8 shadow-[0px_1px_5px_rgba(0,0,0,0.40)] md:hidden">
        <button
          className="flex grow items-center justify-center rounded-lg bg-g1_5 py-5 font-iransansbold text-xl text-light_1"
          onClick={payHandler}
        >
          {paymentMethod === PayMethod.NOT_PAYED
            ? "نحوه پرداخت را مشخص کنید"
            : "پرداخت"}
        </button>
        <div className="flex grow flex-col items-end justify-between gap-3 text-dark_3">
          <div className="flex items-center gap-2">
            <label className="font-iranyekan_bold text-lg font-bold text-dark_4">
              قابل پرداخت
            </label>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-iransansnum text-2xl font-bold">
              {numberSeperator(cart.subTotalWithDiscount + postingPrice)}
            </span>
            <TomanIcon classes="h-8 w-8 fill-dark_1 " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment_form;
