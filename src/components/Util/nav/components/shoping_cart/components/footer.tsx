import TomanIcon from "@/components/Util/icons/TomanIcon";
import { SheetClose } from "@/components_shadcn/ui/sheet";
import { numberSeperator } from "@/lib/util/price_formt";
import Link from "next/link";
import React from "react";

interface Props {
  cart_subtotal: number;
  sheet: boolean;
}

const Footer = ({ cart_subtotal, sheet }: Props) => {
  const totalPrice = numberSeperator(cart_subtotal);

  return (
    <div className="flex justify-between items-center border-t-2 p-2">
      <div className="flex flex-col gap-2">
        <span className="font-bold text-gray-500">مبلغ قابل پرداخت</span>
        <div className="flex gap-2">
          <span className="font-iransansnum font-bold text-2xl tracking-[.05em]">
            {totalPrice}
          </span>
          <TomanIcon classes="h-8 w-8" />
        </div>
      </div>
      {sheet ? (
        <SheetClose asChild>
          <Link
            href={"/checkout"}
            className="bg-g1_5 text-light_1 p-4 rounded-lg"
          >
            ثبت سفارش
          </Link>
        </SheetClose>
      ) : (
        <Link
          href={"/checkout"}
          className="bg-g1_5 text-light_1 p-4 rounded-lg"
        >
          ثبت سفارش
        </Link>
      )}
    </div>
  );
};

export default Footer;
