import { Progress } from "@/components_shadcn/ui/progress";
import { OrderStatus } from "@prisma/client";
import React, { useEffect, useState } from "react";

interface Props {
  status: OrderStatus;
}

const ProgressOrdering = ({ status }: Props) => {
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
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="px-2">
          {status === OrderStatus.CANCELED && (
            <span className="font-iranyekan_bold">سفارش لغو شده</span>
          )}
          {status === OrderStatus.REJECTED && (
            <span className="font-iranyekan_bold">سفارش مرجوع شده</span>
          )}
          {status === OrderStatus.NOT_CONFIRMED && (
            <span className="font-iranyekan_bold">در حال پذیرش</span>
          )}
          {status === OrderStatus.IN_PROCESS && (
            <span className="font-iranyekan_bold">در حال پردازش</span>
          )}
          {status === OrderStatus.ON_DELIVERY && (
            <span className="font-iranyekan_bold"> در حال ارسال</span>
          )}
          {status === OrderStatus.DELIVERED && (
            <span className="font-iranyekan_bold">تحویل شده</span>
          )}
        </div>
        {(status === OrderStatus.NOT_CONFIRMED ||
          status === OrderStatus.IN_PROCESS ||
          status === OrderStatus.ON_DELIVERY) && (
          <div className="px-2">
            <label>مرحله بعدی : </label>
            {status === OrderStatus.NOT_CONFIRMED && (
              <span className="font-iranyekan_bold">پردازش سفارش</span>
            )}
            {status === OrderStatus.IN_PROCESS && (
              <span className="font-iranyekan_bold"> ارسال سفارش</span>
            )}
            {status === OrderStatus.ON_DELIVERY && (
              <span className="font-iranyekan_bold">تحویل سفارش</span>
            )}
          </div>
        )}
      </div>
      <Progress
        value={progress}
        className={`
        ${
          status === OrderStatus.CANCELED || status === OrderStatus.REJECTED
            ? "bg-g1_5"
            : "bg-success"
        }
        `}
      />
    </div>
  );
};

export default ProgressOrdering;
