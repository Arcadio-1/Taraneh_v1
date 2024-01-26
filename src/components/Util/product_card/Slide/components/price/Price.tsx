import TomanIcon from "@/components/Util/ui/icons/TomanIcon";
import { price_format } from "@/util_functions/price_formt";
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
    <div className="mt-3 flex flex-col font-iransansnum text-xl font-bold">
      <div className="flex items-center justify-between">
        {!!off_percent && <Off_percent percent={price.off_percent} />}
        <div className="mr-auto flex items-start justify-end pl-3">
          <Final_price
            off_percent={off_percent}
            off_price={price.off_price}
            price={price.price}
          />
          <TomanIcon classes="h-7 w-7" />
        </div>
      </div>
    </div>
  );
};

export default Price;
