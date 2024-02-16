import { Order } from "@prisma/client";
import React from "react";
import Header from "./components/Header";
import Detials from "./components/Detials";
import PostingData from "./components/PostingData";
import CartItems from "./components/CartItems";
import Actions from "./components/Actions";

interface Props {
  order: Order;
}

const OrderItem = ({ order }: Props) => {
  return (
    <div key={order.id} className="py-6 flex flex-col gap-4 border rounded-lg">
      <Header status={order.status} />
      <Detials
        final_price={order.final_price}
        order_id={order.id}
        selectedDate={order.selectedDate}
      />
      <div className="flex flex-col gap-4 border p-2">
        <PostingData selectedDate={order.selectedDate} status={order.status} />
        <CartItems cartItems={order.cart.items} />
      </div>
      <Actions order_id={order.id} />
    </div>
  );
};

export default OrderItem;
