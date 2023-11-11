import DotIcon from "@/components/Util/icons/DotIcon";
import ShippingIcon from "@/components/Util/icons/ShippingIcon";
import TomanIcon from "@/components/Util/icons/TomanIcon";
import { numberSeperator } from "@/lib/util/price_formt";
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
      500
    );
    return () => clearTimeout(timer);
  }, [status]);

  return (
    <div className="grow flex flex-col gap-6 border py-4 px-6 rounded-lg ">
      <div className="flex items-stretch">
        {status !== OrderStatus.CANCELED && (
          <div className="flex grow flex-col gap-4">
            <div className="flex items-center gap-2">
              <ShippingIcon classes="h-6 w-6 fill-g1_5" />
              <span className="font-iranyekan_bold text-dark_1 text-lg">
                ارسال عادی
              </span>
            </div>
            <div className="flex flex-col grow gap-5">
              <div className="flex gap-2 items-center">
                <label className="text-dark_5 font-iranyekan_bold">
                  زمان تحویل :
                </label>
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
              <div className="flex gap-4 items-center">
                <div className="flex gap-2 items-center">
                  <label className="text-dark_5 font-iranyekan_bold">
                    هزینه ارسال :
                  </label>
                  <div className="text-dark_1 font-bold">
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
                <div className="flex gap-2 items-center">
                  <label className="text-dark_5 font-iranyekan_bold">
                    مبلغ مرسوله :
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="font-iransansnum text-xl text-dark_2 font-bold">
                      {numberSeperator(final_price)}
                    </span>
                    <TomanIcon classes="h-5 w-5 fill-dark_2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col justify-between grow">
          <ProgressOrdering status={status} />
          {status === OrderStatus.ON_DELIVERY && (
            <div className="flex gap-2 items-center">
              <label className="text-dark_5 font-iranyekan_bold">
                کد پیگیری مرسوله :
              </label>
              <span className="font-iransansnum text-xl text-dark_2 font-bold">
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
