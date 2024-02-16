import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import React from "react";
import { getOrder } from "@/actions/ordering/order/getOrder";
import Header from "@/components/Pages/Profile_page/OrderDetails/Header";
import Divider from "@/components/Util/ui/Divider";
import HeadOrderDetials from "@/components/Pages/Profile_page/OrderDetails/HeadOrderDetials";
import PersonalInfo from "@/components/Pages/Profile_page/OrderDetails/PersonalInfo";
import PaymentDetials from "@/components/Pages/Profile_page/OrderDetails/PaymentDetials";
import PostingDetials from "@/components/Pages/Profile_page/OrderDetails/PostingDetials";
import { OrderStatus } from "@prisma/client";
import PostTracking from "@/components/Pages/Profile_page/OrderDetails/PostTracking";
import OrderItems from "@/components/Pages/Profile_page/OrderDetails/OrderItems";
import OrderCancling from "@/components/Pages/Profile_page/OrderDetails/OrderCancling";

interface Props {
  params: {
    order_id: string;
  };
}

const page = async ({ params: { order_id } }: Props) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/users/login?callback=/profile");
  }
  const requestOrder = await getOrder(order_id);

  if (!requestOrder.ok) {
    return notFound();
  }
  const { order } = requestOrder;

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

export default page;
