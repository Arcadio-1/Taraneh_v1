import { TGetOrders } from "@/actions/ordering/order/getOrders";
import { TabsList, TabsTrigger } from "@/components/Util/shadcn/ui/tabs";
import SpinnerIcon from "@/components/Util/ui/icons/SpinnerIcon";
import { OrderStatus } from "@prisma/client";
import React, { useEffect, useReducer, useState } from "react";

interface Props {
  orders: TGetOrders | undefined;
  loading: boolean;
}

const initialValue = {
  rejected: 0,
  canceled: 0,
  inProcess: 0,
  deliverd: 0,
};

type State = typeof initialValue;

type Action = {
  type: OrderStatus;
};

const reducer = (state: State, action: Action): State => {
  const { type } = action;
  switch (type) {
    case OrderStatus.REJECTED:
      return { ...state, rejected: state.rejected++ };
    case OrderStatus.DELIVERED:
      return { ...state, deliverd: state.deliverd++ };
    case OrderStatus.ON_DELIVERY:
      return { ...state, inProcess: state.inProcess++ };
    case OrderStatus.IN_PROCESS:
      return { ...state, inProcess: state.inProcess++ };
    case OrderStatus.NOT_CONFIRMED:
      return { ...state, inProcess: state.inProcess++ };
    case OrderStatus.CANCELED:
      return { ...state, canceled: state.canceled++ };
    default:
      return { canceled: 0, deliverd: 0, inProcess: 0, rejected: 0 };
  }
};

const OrderTabs = ({ orders, loading }: Props) => {
  const [activeTab, setActiveTab] = useState<OrderStatus>(
    OrderStatus.NOT_CONFIRMED,
  );

  const [amount, dispatchAmount] = useReducer(reducer, initialValue);

  useEffect(() => {
    if (orders?.ok) {
      //@ts-ignore
      dispatchAmount({ type: "RESET" });
      orders.orders.map((order) => {
        dispatchAmount({ type: order.status });
      });
    }
  }, [loading, orders?.ok, orders?.orders]);

  return (
    <TabsList className="flex  justify-start gap-2 p-4 ">
      <TabsTrigger
        key={OrderStatus.IN_PROCESS}
        value={OrderStatus.IN_PROCESS}
        onClick={() => {
          setActiveTab(OrderStatus.NOT_CONFIRMED);
        }}
        className="text-md items-center gap-3 pt-6 font-iranyekan_bold "
      >
        <span className="text-dark_4 ">در حال پردازش</span>
        {loading ? (
          <SpinnerIcon className="h-5 w-5 border-2" />
        ) : (
          <span
            data-state={`${
              activeTab === OrderStatus.NOT_CONFIRMED ? "active" : "deactive"
            }`}
            className="rounded-lg px-2  font-iransansnum text-xl data-[state=active]:bg-g1_7 data-[state=active]:text-light_1 "
          >
            {amount.inProcess}
          </span>
        )}
      </TabsTrigger>
      <TabsTrigger
        key={OrderStatus.DELIVERED}
        value={OrderStatus.DELIVERED}
        className="text-md items-center gap-3 pt-6 font-iranyekan_bold"
        onClick={() => {
          setActiveTab(OrderStatus.DELIVERED);
        }}
      >
        <span className="text-dark_4">تحویل شده</span>
        {loading ? (
          <SpinnerIcon className="h-5 w-5 border-2" />
        ) : (
          <span
            data-state={`${
              activeTab === OrderStatus.DELIVERED ? "active" : "deactive"
            }`}
            className="rounded-lg px-2 font-iransansnum text-xl data-[state=active]:bg-g1_7 data-[state=active]:text-light_1"
          >
            {amount.deliverd}
          </span>
        )}
      </TabsTrigger>
      <TabsTrigger
        key={OrderStatus.CANCELED}
        value={OrderStatus.CANCELED}
        className="text-md items-center gap-3 pt-6 font-iranyekan_bold"
        onClick={() => {
          setActiveTab(OrderStatus.CANCELED);
        }}
      >
        <span className="text-dark_4">لغو شده</span>
        {loading ? (
          <SpinnerIcon className="h-5 w-5 border-2" />
        ) : (
          <span
            data-state={`${
              activeTab === OrderStatus.CANCELED ? "active" : "deactive"
            }`}
            className="rounded-lg px-2 font-iransansnum text-xl data-[state=active]:bg-g1_7 data-[state=active]:text-light_1"
          >
            {amount.canceled}
          </span>
        )}
      </TabsTrigger>
      <TabsTrigger
        key={OrderStatus.REJECTED}
        value={OrderStatus.REJECTED}
        className="text-md items-center gap-3 pt-6 font-iranyekan_bold"
        onClick={() => {
          setActiveTab(OrderStatus.REJECTED);
        }}
      >
        <span className="text-dark_4">مرجوع شده</span>
        {loading ? (
          <SpinnerIcon className="h-5 w-5 border-2" />
        ) : (
          <span
            data-state={`${
              activeTab === OrderStatus.REJECTED ? "active" : "deactive"
            }`}
            className="rounded-lg px-2 font-iransansnum text-xl data-[state=active]:bg-g1_7 data-[state=active]:text-light_1"
          >
            {amount.rejected}
          </span>
        )}
      </TabsTrigger>
    </TabsList>
  );
};

export default OrderTabs;
