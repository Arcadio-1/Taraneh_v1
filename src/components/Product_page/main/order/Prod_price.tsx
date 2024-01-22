import TomanIcon from "@/components/Util/icons/TomanIcon";
import { price_format } from "@/util_functions/price_formt";
import React from "react";

interface Props {
  price: number;
  offPercent: number;
}

const Prod_price = ({ offPercent, price }: Props) => {
  const pricer = price_format(price, offPercent);

  return (
    <div className="flex flex-col items-center gap-4 font-iransansnum lg:gap-2">
      {!!offPercent && (
        <div className=" flex gap-3">
          <span className="text-opacity-50 line-through">{pricer.price}</span>
          <span className="rounded-2xl bg-g1_5 px-3 py-[1px] text-light_1">
            {pricer.off_percent}
          </span>
        </div>
      )}
      <div className="flex">
        <span className="text-2xl font-bold">
          {pricer.off_percent ? pricer.off_price : pricer.price}
        </span>
        <TomanIcon classes="h-6 w-6" />
      </div>
    </div>
  );
};

export default Prod_price;
