import ProgressOrdering from "@/components/Profile_page/Order_section/components/ProgressOrdering";
import ShippingIcon from "@/components/Util/icons/ShippingIcon";
import { OrderSelectedDate, OrderStatus } from "@prisma/client";
import React from "react";

interface Props {
  selectedDate: OrderSelectedDate;
  status: OrderStatus;
}

const PostingData = ({ selectedDate, status }: Props) => {
  return (
    <div className="flex w-full p-4">
      <div className="grow flex flex-col gap-3">
        <div className="flex gap-2">
          <ShippingIcon classes="h-6 w-6 fill-g1_5" />
          <span>ارسال عادی</span>
        </div>
        <div className="flex items-center gap-2">
          <label>تحویل</label>
          <div className="flex gap-1 items-center">
            <span className="text-dark_1 font-iranyekan_bold font-bold text-lg">
              {selectedDate.weekday}
            </span>
            <span className="text-dark_1 font-iransansnum text-xl font-bold">
              {selectedDate.day}
            </span>
            <span className="text-dark_1 font-iranyekan_bold text-xl font-bold">
              {selectedDate.month_name}
            </span>
            <p className="text-dark_1 font-iranyekan_bold text-xl font-bold flex items-center gap-2">
              <span> - </span>
              <span>ساعت</span>
              <span className="font-iransansnum">9</span>
              <span>تا</span>
              <span className="font-iransansnum">22</span>
            </p>
          </div>
        </div>
      </div>
      <div className="grow">
        <ProgressOrdering status={status} />
      </div>
    </div>
  );
};

export default PostingData;
