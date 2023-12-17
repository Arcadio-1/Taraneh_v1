import DotIcon from "@/components/Util/icons/DotIcon";
import TomanIcon from "@/components/Util/icons/TomanIcon";
import { numberSeperator } from "@/lib/util/price_formt";
import { OrderSelectedDate } from "@prisma/client";
import React from "react";

interface Props {
  order_id: string;
  selectedDate: OrderSelectedDate;
  final_price: number;
}

const Detials = ({ final_price, order_id, selectedDate }: Props) => {
  return (
    <div className="flex  items-center justify-start gap-3 px-6 flex-wrap">
      <p className="flex  items-center justify-start text-xl text-dark_5 font-bold gap-2">
        <span className="font-iransansnum">{selectedDate.day}</span>
        <span className="font-iranyekan_bold">{selectedDate.month_name}</span>
        <span className="font-iransansnum">{selectedDate.year}</span>
      </p>
      <DotIcon classes="h-5 w-5 fill-dark_5" />

      <div className="flex gap-2 items-center justify-start text-xl">
        <label className="text-dark_5 font-iranyekan_bold"> مبلغ</label>
        <div className="flex items-center flex-row-revers gap-1">
          <span className="font-iransansnum font-bold text-xl">
            {numberSeperator(final_price)}
          </span>
          <TomanIcon classes="w-6 h-6" />
        </div>
      </div>
      <DotIcon classes="h-5 w-5 fill-dark_5" />
      <div className="flex gap-1 items-center justify-start text-xl">
        <label className="text-dark_5 font-iranyekan_bold "> کد سفارش</label>
        <span className="text-dark_1 font-iransansnum">{order_id}</span>
      </div>
    </div>
  );
};

export default Detials;
