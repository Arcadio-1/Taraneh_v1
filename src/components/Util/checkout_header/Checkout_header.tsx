import React from "react";
import CartIcon from "../icons/CartIcon";
import ShippingIcon from "../icons/ShippingIcon";
import PaymentIcon from "../icons/PaymentIcon";
import Link from "next/link";

export enum Stage {
  checkout,
  shipping,
  payment,
}
interface Props {
  stage: Stage;
}

const Checkout_header = ({ stage }: Props) => {
  return (
    <div className="flex flex-col border rounded-lg items-center gap-5   py-3 px-4">
      <div>
        <Link href={"/"}>
          <h1 className="text-3xl text-g1_5 font-iranyekan_bold">کافه ترانه</h1>
        </Link>
      </div>
      <div className="flex max-w-[450px] w-full items-center gap-6 font-iransansbold">
        <div
          className={`flex shrink-0 gap-2 ${
            (stage === Stage.shipping || stage === Stage.payment) &&
            "opacity-60"
          }`}
        >
          <CartIcon classes={`h-5 w-5 stroke-g1_5`} />
          <Link href={"/checkout"} className={` text-g1_5`}>
            سبد خرید
          </Link>
        </div>
        <div
          className={`h-[2px] w-full grow ${
            (stage === Stage.shipping || stage === Stage.payment) &&
            "bg-g1_5 opacity-60"
          }`}
        ></div>
        <div
          className={`flex shrink-0 gap-2 ${
            stage === Stage.payment && "opacity-60"
          }`}
        >
          <ShippingIcon
            className={`h-5 w-5 ${
              (stage === Stage.shipping || stage === Stage.payment) &&
              "fill-g1_5 h-8 w-8"
            }`}
          />
          <Link
            href={"/shipping"}
            className={`${
              (stage === Stage.shipping || stage === Stage.payment) &&
              "text-xl text-g1_5"
            } `}
          >
            زمان و نحوه ارسال
          </Link>
        </div>
        <div
          className={`h-[2px] w-full grow ${
            stage === Stage.payment && "bg-g1_5 opacity-60"
          } ${stage === Stage.shipping && "bg-gray-300 opacity-100"}`}
        ></div>
        <div
          className={`flex items-center shrink-0 gap-2 ${
            stage === Stage.shipping && "opacity-60"
          }`}
        >
          <PaymentIcon
            classes={`h-5 w-5 ${
              stage === Stage.payment && "fill-g1_5 h-9 w-8"
            }`}
          />
          <Link
            href={"/payment"}
            className={`${stage === Stage.payment && "text-xl text-g1_5"} `}
          >
            پرداخت
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout_header;
