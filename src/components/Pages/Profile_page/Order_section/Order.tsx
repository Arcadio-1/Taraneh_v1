"use client";
import { Order, OrderStatus } from "@prisma/client";
import React from "react";
import Header from "./components/Header";
import HeadOrderDetials from "./components/HeadOrderDetials";
import PersonalInfo from "./components/PersonalInfo";
import PaymentDetials from "./components/PaymentDetials";
import PostingDetials from "./components/PostingDetials";
import PostTracking from "./components/PostTracking";
import OrderItems from "./components/OrderItems";
import OrderCancling from "./components/OrderCancling";
import Divider from "@/components/Util/ui/Divider";
interface Props {
  order: Order;
}
const Order = ({ order }: Props) => {
  return (
    <div className="col-span-8 rounded-lg border px-2 py-5 md:col-span-6">
      <Header />
      <Divider />

      <HeadOrderDetials Order_id={order.id} createdAt={order.createdAt} />
      <Divider />

      <PersonalInfo
        name={order.user.name}
        family={order.user.family}
        phone={order.user.phone}
        address={order.address}
      />
      <Divider />

      <PaymentDetials
        final_price={order.final_price}
        payment_method={order.payment_method}
        posting_price={order.posting_price}
        subDiscount={order.cart.subDiscount}
      />
      <Divider />
      <div className="flex flex-col gap-5 px-8 py-4">
        <PostingDetials
          final_price={order.final_price}
          order_id={order.id}
          posting_price={order.posting_price}
          selectedDate={order.selectedDate}
          status={order.status}
        />
        {order.status === OrderStatus.ON_DELIVERY && (
          <PostTracking order_id={order.id} />
        )}
        <OrderItems order_items={order.cart.items} />
        {order.status === OrderStatus.IN_PROCESS ||
          (order.status === OrderStatus.NOT_CONFIRMED && (
            <OrderCancling order_id={order.id} />
          ))}
      </div>
    </div>
  );
};

export default Order;
