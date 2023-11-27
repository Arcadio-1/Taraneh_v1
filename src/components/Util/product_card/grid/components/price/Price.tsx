import TomanIcon from "@/components/Util/icons/TomanIcon";
import { price_format } from "@/lib/util/price_formt";
import React from "react";
import Off_percent from "./component/Off_percent";
import Final_price from "./component/Final_price";

interface Props {
  price: number;
  off_percent: number;
}

const Price = ({ price: org_price, off_percent }: Props) => {
  const price = price_format(org_price, off_percent);
  return (
    <div className="font-iransansnum text-xl font-bold flex flex-col">
      <div className="flex items-center justify-between">
        {!!off_percent && <Off_percent percent={price.off_percent} />}
        <div className="flex justify-end items-start mr-auto pl-3">
          <Final_price
            off_percent={off_percent}
            off_price={price.off_price}
            price={price.price}
          />
          <TomanIcon classes="h-8 w-8" />
        </div>
      </div>
    </div>
  );
};

export default Price;
