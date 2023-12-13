import TomanIcon from "@/components/Util/icons/TomanIcon";
import { price_format } from "@/lib/util/price_formt";
import React from "react";

interface Props {
  price: number;
  offPercent: number;
}

const Prod_price = ({ offPercent, price }: Props) => {
  const pricer = price_format(price, offPercent);

  return (
    <div className="flex items-center flex-col gap-4 lg:gap-2 font-iransansnum">
      {!!offPercent && (
        <div className=" flex gap-3">
          <span className="line-through text-opacity-50">{pricer.price}</span>
          <span className="bg-g1_5 text-light_1 py-[1px] px-3 rounded-2xl">
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
