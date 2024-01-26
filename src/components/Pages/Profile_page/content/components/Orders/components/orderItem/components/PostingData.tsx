import ProgressOrdering from "@/components/Pages/Profile_page/Order_section/components/ProgressOrdering";
import ShippingIcon from "@/components/Util/ui/icons/ShippingIcon";
import { OrderSelectedDate, OrderStatus } from "@prisma/client";
import React from "react";

interface Props {
  selectedDate: OrderSelectedDate;
  status: OrderStatus;
}

const PostingData = ({ selectedDate, status }: Props) => {
  return (
    <div className="flex w-full flex-wrap gap-4 p-4">
      <div className="flex grow flex-col gap-3">
        <div className="flex gap-2">
          <ShippingIcon className="h-6 w-6 fill-g1_5" />
          <span>ارسال عادی</span>
        </div>
        <div className="flex items-center gap-2">
          <label>تحویل</label>
          <div className="flex items-center gap-1">
            <span className="font-iranyekan_bold text-lg font-bold text-dark_1">
              {selectedDate.weekday}
            </span>
            <span className="font-iransansnum text-xl font-bold text-dark_1">
              {selectedDate.day}
            </span>
            <span className="font-iranyekan_bold text-xl font-bold text-dark_1">
              {selectedDate.month_name}
            </span>
            <p className="flex items-center gap-2 font-iranyekan_bold text-xl font-bold text-dark_1">
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
