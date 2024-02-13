import { authOptions } from "@/lib/auth/authOptions";
import Order from "@/components/Pages/Profile_page/Order_section/Order";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import React from "react";
import { getOrder } from "@/actions/ordering/order/getOrder";

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
  const order = await getOrder(order_id);

  if (!order.ok) {
    return notFound();
  }

  return <Order order={order.order} />;
};

export default page;
