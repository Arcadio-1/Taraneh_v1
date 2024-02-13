import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/lib/auth/authOptions";
import { redirect } from "next/navigation";
import Content from "@/components/Pages/Profile_page/content/Content";
import { getOrders } from "@/actions/ordering/order/getOrders";
import { getAddress } from "@/actions/userInfo/address/getAddress";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/users/login?callback=/profile");
  }
  const address = await getAddress();
  const orders = await getOrders();

  return (
    <Content
      orders={orders.orders}
      session={session}
      address={address.address}
    />
  );
};

export default page;
