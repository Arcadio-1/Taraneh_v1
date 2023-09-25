import TomanIcon from "@/components/Util/icons/TomanIcon";
import { numberSeperator, price_calculator } from "@/lib/util/price_formt";
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
        <div className="text-g1_5 flex items-center gap-1">
          <span className="font-iransansnum font-bold text-lg">
            {numberSeperator(quantity * (price - calced_price))}
          </span>
          <TomanIcon classes="h-6 w-6 fill-g1_5" />
          <span className="text-sm font-iranyekan_bold">تخفیف</span>
        </div>
      )}
      <div className="text-dark_3 flex items-center gap-1">
        <span className="font-iransansnum font-bold text-2xl">
          {numberSeperator(quantity * calced_price)}
        </span>
        <TomanIcon classes="h-7 w-7 fill-dark_3" />
      </div>
    </div>
  );
};

export default ShoppingListItemPrice;
