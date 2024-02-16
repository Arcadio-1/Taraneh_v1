import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { authOptions } from "@/lib/auth/authOptions";
import { getOrders } from "@/actions/ordering/order/getOrders";
import Dashboard from "@/components/Pages/Profile_page/Dashboard/Dashboard";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/users/login?callback=/profile");
  }

  const order = await getOrders();

  return <Dashboard session={session} orders={order.orders} />;
};

export default page;
