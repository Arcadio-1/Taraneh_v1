import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import Content from "@/components/Pages/Profile_page/content/Content";
import { authOptions } from "@/lib/auth/authOptions";
import { getOrders } from "@/actions/ordering/order/getOrders";
import { getAddress } from "@/actions/userInfo/address/getAddress";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/users/login?callback=/profile");
  }
  const address = await getAddress();

  const order = await getOrders();

  return (
    <Content
      orders={order.orders}
      session={session}
      address={address.address}
    />
  );
};

export default page;
