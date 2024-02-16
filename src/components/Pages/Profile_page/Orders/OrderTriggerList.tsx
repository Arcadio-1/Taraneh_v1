"use client";
import { TabsList, TabsTrigger } from "@/components/Util/shadcn/ui/tabs";
import { Order, OrderStatus } from "@prisma/client";
import React, { useEffect, useState } from "react";

interface Props {
  orders: Order[] | [];
}

const OrderTriggerList = ({ orders }: Props) => {
  const [activeTab, setActiveTab] = useState<OrderStatus>("IN_PROCESS");

  const [canceled, setCanceled] = useState<number>(0);
  const [inProcess, setInProcess] = useState<number>(0);
  const [deliverd, setdeliverd] = useState<number>(0);
  const [rejected, setRejected] = useState<number>(0);

  useEffect(() => {
    if (orders.length) {
      orders.map((order) => {
        switch (order.status) {
          case "REJECTED":
            setRejected((prev) => {
              return (prev = prev + 1);
            });
            break;
          case "DELIVERED":
            setdeliverd((prev) => {
              return (prev = prev + 1);
            });
            break;
          case "IN_PROCESS":
            setInProcess((prev) => {
              return (prev = prev + 1);
            });
            break;
          case "IN_PROCESS":
            setInProcess((prev) => {
              return (prev = prev + 1);
            });
            break;
          case "ON_DELIVERY":
            setInProcess((prev) => {
              return (prev = prev + 1);
            });
            break;
          case "NOT_CONFIRMED":
            setInProcess((prev) => {
              return (prev = prev + 1);
            });
            break;
          case "CANCELED":
            setCanceled((prev) => {
              return (prev = prev + 1);
            });
            break;
        }
      });
    }
    return () => {
      setCanceled(0);
      setInProcess(0);
      setdeliverd(0);
      setRejected(0);
    };
  }, [orders]);

  type TTriggerObject = {
    item: OrderStatus;
    amount: number;
    label: string;
  };

  const triggerObject: TTriggerObject[] = [
    {
      item: "IN_PROCESS",
      amount: inProcess,
      label: "در حال پردازش",
    },
    {
      item: "DELIVERED",
      amount: deliverd,
      label: "تحویل شده",
    },
    {
      item: "CANCELED",
      amount: canceled,
      label: "لغو شده",
    },
    {
      item: "REJECTED",
      amount: rejected,
      label: "مرجوع شده",
    },
  ];

  return (
    <TabsList className="flex  justify-start gap-2 p-4 ">
      {triggerObject.map((trigger) => {
        return (
          <TabsTrigger
            key={trigger.item}
            value={trigger.item}
            onClick={() => {
              setActiveTab(trigger.item);
            }}
            className="text-md items-center gap-3 pt-6 font-iranyekan_bold "
          >
            <span className="text-dark_4 ">{trigger.label}</span>
            <span
              data-state={`${activeTab === trigger.item ? "active" : "deactive"}`}
              className="rounded-lg px-2  font-iransansnum text-xl data-[state=active]:bg-g1_7 data-[state=active]:text-light_1 "
            >
              {trigger.amount}
            </span>
          </TabsTrigger>
        );
      })}
    </TabsList>
  );
};

export default OrderTriggerList;
