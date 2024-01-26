import TomanIcon from "@/components/Util/ui/icons/TomanIcon";
import {
  numberSeperator,
  price_calculator,
} from "@/util_functions/price_formt";
import React from "react";

interface Props {
  price: number;
  off_percent: number;
  quantity: number;
}

const ShoppingListItemPrice = ({ price, off_percent, quantity }: Props) => {
  const calced_price = price_calculator(price, off_percent);
  return (
    <div>
      {off_percent > 0 && (
        <div className="flex items-center gap-1 text-g1_5">
          <span className="font-iransansnum text-lg font-bold">
            {numberSeperator(quantity * (price - calced_price))}
          </span>
          <TomanIcon classes="h-6 w-6 fill-g1_5" />
          <span className="font-iranyekan_bold text-sm">تخفیف</span>
        </div>
      )}
      <div className="flex items-center gap-1 text-dark_3">
        <span className="font-iransansnum text-2xl font-bold">
          {numberSeperator(quantity * calced_price)}
        </span>
        <TomanIcon classes="h-7 w-7 fill-dark_3" />
      </div>
    </div>
  );
};

export default ShoppingListItemPrice;
