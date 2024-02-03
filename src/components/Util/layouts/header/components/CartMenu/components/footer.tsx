import TomanIcon from "@/components/Util/ui/icons/TomanIcon";
import { SheetClose } from "@/components/Util/shadcn/ui/sheet";
import { numberSeperator } from "@/util_functions/price_formt";
import Link from "next/link";
import React from "react";

interface Props {
  cart_subtotal: number;
  sheet: boolean;
}

const Footer = ({ cart_subtotal, sheet }: Props) => {
  const totalPrice = numberSeperator(cart_subtotal);

  return (
    <div className="flex items-center justify-between border-t-2 p-2">
      <div className="flex flex-col gap-2">
        <span className="font-bold text-gray-500">مبلغ قابل پرداخت</span>
        <div className="flex gap-2">
          <span className="font-iransansnum text-2xl font-bold tracking-[.05em]">
            {totalPrice}
          </span>
          <TomanIcon classes="h-8 w-8" />
        </div>
      </div>
      {sheet ? (
        <SheetClose asChild>
          <Link
            href={"/checkout"}
            className="rounded-lg bg-g1_5 p-4 text-light_1"
          >
            ثبت سفارش
          </Link>
        </SheetClose>
      ) : (
        <Link
          href={"/checkout"}
          className="rounded-lg bg-g1_5 p-4 text-light_1"
        >
          ثبت سفارش
        </Link>
      )}
    </div>
  );
};

export default Footer;
