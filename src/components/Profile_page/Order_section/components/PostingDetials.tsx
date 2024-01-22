import DotIcon from "@/components/Util/icons/DotIcon";
import ShippingIcon from "@/components/Util/icons/ShippingIcon";
import TomanIcon from "@/components/Util/icons/TomanIcon";
import { numberSeperator } from "@/util_functions/price_formt";
import { OrderSelectedDate, OrderStatus } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { Progress } from "@/components_shadcn/ui/progress";
import ProgressOrdering from "./ProgressOrdering";
interface Props {
  order_id: string;
  selectedDate: OrderSelectedDate;
  posting_price: number;
  final_price: number;
  status: OrderStatus;
}

const PostingDetials = ({
  final_price,
  order_id,
  posting_price,
  selectedDate,
  status,
}: Props) => {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(
      () =>
        setProgress((prev) => {
          if (status === OrderStatus.CANCELED) {
            return (prev = 0);
          }
          if (status === OrderStatus.REJECTED) {
            return (prev = 0);
          }
          if (status === OrderStatus.NOT_CONFIRMED) {
            return (prev = 90);
          }
          if (status === OrderStatus.IN_PROCESS) {
            return (prev = 60);
          }
          if (status === OrderStatus.ON_DELIVERY) {
            return (prev = 20);
          }
          if (status === OrderStatus.DELIVERED) {
            return (prev = 0);
          }
          return (prev = 100);
        }),
      500,
    );
    return () => clearTimeout(timer);
  }, [status]);

  return (
    <div className="flex grow flex-col gap-6 rounded-lg border px-6 py-4 ">
      <div className="flex flex-col items-stretch md:flex-row">
        {status !== OrderStatus.CANCELED && (
          <div className="flex grow flex-col gap-4">
            <div className="flex items-center gap-2">
              <ShippingIcon className="h-6 w-6 fill-g1_5" />
              <span className="font-iranyekan_bold text-lg text-dark_1">
                ارسال عادی
              </span>
            </div>
            <div className="flex grow flex-col gap-5">
              <div className="flex items-center gap-2">
                <label className="font-iranyekan_bold text-dark_5">
                  زمان تحویل :
                </label>
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
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="font-iranyekan_bold text-dark_5">
                    هزینه ارسال :
                  </label>
                  <div className="font-bold text-dark_1">
                    {posting_price && (
                      <div className="flex items-center gap-2">
                        <span className="font-iransansnum text-xl text-dark_3">
                          {numberSeperator(posting_price)}
                        </span>
                        <TomanIcon classes="h-5 w-5 fill-dark_2" />
                      </div>
                    )}
                    {!posting_price && <span>رایگان</span>}
                  </div>
                </div>
                <DotIcon classes=" h-2 w-2 fill-dark_5" />
                <div className="flex items-center gap-2">
                  <label className="font-iranyekan_bold text-dark_5">
                    مبلغ مرسوله :
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="font-iransansnum text-xl font-bold text-dark_2">
                      {numberSeperator(final_price)}
                    </span>
                    <TomanIcon classes="h-5 w-5 fill-dark_2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="mt-5 flex grow flex-col justify-between gap-5 md:m-0">
          <ProgressOrdering status={status} />
          {status === OrderStatus.ON_DELIVERY && (
            <div className="flex items-center gap-2">
              <label className="font-iranyekan_bold text-dark_5">
                کد پیگیری مرسوله :
              </label>
              <span className="font-iransansnum text-xl font-bold text-dark_2">
                {order_id}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostingDetials;
