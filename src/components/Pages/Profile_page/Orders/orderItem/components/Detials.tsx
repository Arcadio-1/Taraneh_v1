import DotIcon from "@/components/Util/ui/icons/DotIcon";
import TomanIcon from "@/components/Util/ui/icons/TomanIcon";
import { numberSeperator } from "@/util_functions/price_formt";
import { OrderSelectedDate } from "@prisma/client";
import React from "react";

interface Props {
  order_id: string;
  selectedDate: OrderSelectedDate;
  final_price: number;
}

const Detials = ({ final_price, order_id, selectedDate }: Props) => {
  return (
    <div className="flex  flex-wrap items-center justify-start gap-3 px-6">
      <p className="flex  items-center justify-start gap-2 text-xl font-bold text-dark_5">
        <span className="font-iransansnum">{selectedDate.day}</span>
        <span className="font-iranyekan_bold">{selectedDate.month_name}</span>
        <span className="font-iransansnum">{selectedDate.year}</span>
      </p>
      <DotIcon classes="h-5 w-5 fill-dark_5" />

      <div className="flex items-center justify-start gap-2 text-xl">
        <label className="font-iranyekan_bold text-dark_5"> مبلغ</label>
        <div className="flex-row-revers flex items-center gap-1">
          <span className="font-iransansnum text-xl font-bold">
            {numberSeperator(final_price)}
          </span>
          <TomanIcon classes="w-6 h-6" />
        </div>
      </div>
      <DotIcon classes="h-5 w-5 fill-dark_5" />
      <div className="flex items-center justify-start gap-1 text-xl">
        <label className="font-iranyekan_bold text-dark_5 "> کد سفارش</label>
        <span className="font-iransansnum text-dark_1">{order_id}</span>
      </div>
    </div>
  );
};

export default Detials;
