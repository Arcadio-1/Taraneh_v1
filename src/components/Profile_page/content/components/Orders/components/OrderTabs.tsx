import { TabsList, TabsTrigger } from "@/components_shadcn/ui/tabs";
import { Order, OrderStatus } from "@prisma/client";
import React, { useEffect, useState } from "react";

interface Props {
  orders: Order[] | null;
}

const OrderTabs = ({ orders }: Props) => {
  const [state, setState] = useState<OrderStatus>(OrderStatus.NOT_CONFIRMED);

  const [rejectedNumber, setRejectedNumber] = useState<number>(0);
  const [canceledNumber, setCanceledNumber] = useState<number>(0);
  const [inProcessNumber, setInProcessNumber] = useState<number>(0);
  const [deliverdNumber, setDeleverdNumber] = useState<number>(0);

  useEffect(() => {
    setRejectedNumber(0);
    setCanceledNumber(0);
    setInProcessNumber(0);
    setDeleverdNumber(0);
    if (orders) {
      orders.map((order) => {
        switch (order.status) {
          case OrderStatus.REJECTED:
            setRejectedNumber((prev) => {
              return (prev = prev + 1);
            });
            break;
          case OrderStatus.DELIVERED:
            setDeleverdNumber((prev) => {
              return (prev = prev + 1);
            });
            break;
          case OrderStatus.ON_DELIVERY:
            setInProcessNumber((prev) => {
              return (prev = prev + 1);
            });
            break;

          case OrderStatus.IN_PROCESS:
            setInProcessNumber((prev) => {
              return (prev = prev + 1);
            });
            break;

          case OrderStatus.NOT_CONFIRMED:
            setInProcessNumber((prev) => {
              return (prev = prev + 1);
            });
            break;

          case OrderStatus.CANCELED:
            setCanceledNumber((prev) => {
              return (prev = prev + 1);
            });
            break;
        }
      });
    }
  }, [orders]);
  return (
    <TabsList className="flex  justify-start gap-2 p-4 ">
      <TabsTrigger
        key={OrderStatus.IN_PROCESS}
        value={OrderStatus.IN_PROCESS}
        onClick={() => {
          setState(OrderStatus.NOT_CONFIRMED);
        }}
        className="font-iranyekan_bold text-md items-center gap-3 pt-6 "
      >
        <span className="text-dark_4 ">در حال پردازش</span>
        <span
          data-state={`${
            state === OrderStatus.NOT_CONFIRMED ? "active" : "deactive"
          }`}
          className="font-iransansnum text-xl  data-[state=active]:bg-g1_7 data-[state=active]:text-light_1 px-2 rounded-lg "
        >
          {inProcessNumber}
        </span>
      </TabsTrigger>
      <TabsTrigger
        key={OrderStatus.DELIVERED}
        value={OrderStatus.DELIVERED}
        className="font-iranyekan_bold text-md items-center gap-3 pt-6"
        onClick={() => {
          setState(OrderStatus.DELIVERED);
        }}
      >
        <span className="text-dark_4">تحویل شده</span>
        <span
          data-state={`${
            state === OrderStatus.DELIVERED ? "active" : "deactive"
          }`}
          className="font-iransansnum text-xl data-[state=active]:bg-g1_7 data-[state=active]:text-light_1 px-2 rounded-lg"
        >
          {deliverdNumber}
        </span>
      </TabsTrigger>
      <TabsTrigger
        key={OrderStatus.CANCELED}
        value={OrderStatus.CANCELED}
        className="font-iranyekan_bold text-md items-center gap-3 pt-6"
        onClick={() => {
          setState(OrderStatus.CANCELED);
        }}
      >
        <span className="text-dark_4">لغو شده</span>
        <span
          data-state={`${
            state === OrderStatus.CANCELED ? "active" : "deactive"
          }`}
          className="font-iransansnum text-xl data-[state=active]:bg-g1_7 data-[state=active]:text-light_1 px-2 rounded-lg"
        >
          {canceledNumber}
        </span>
      </TabsTrigger>
      <TabsTrigger
        key={OrderStatus.REJECTED}
        value={OrderStatus.REJECTED}
        className="font-iranyekan_bold text-md items-center gap-3 pt-6"
        onClick={() => {
          setState(OrderStatus.REJECTED);
        }}
      >
        <span className="text-dark_4">مرجوع شده</span>
        <span
          data-state={`${
            state === OrderStatus.REJECTED ? "active" : "deactive"
          }`}
          className="font-iransansnum text-xl data-[state=active]:bg-g1_7 data-[state=active]:text-light_1 px-2 rounded-lg"
        >
          {rejectedNumber}
        </span>
      </TabsTrigger>
    </TabsList>
  );
};

export default OrderTabs;
