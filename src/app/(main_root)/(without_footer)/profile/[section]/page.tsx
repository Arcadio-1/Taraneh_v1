import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/lib/auth/authOptions";
import { redirect } from "next/navigation";
import Aside from "@/components/Pages/Profile_page/side_navaigation/Aside";
import Content from "@/components/Pages/Profile_page/content/Content";
import { prisma } from "@/lib/db/prisma";
import { Address_Full } from "@/types_validation/type";
import { getOrders } from "@/actions/ordering/cart/manageOrders";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/users/login?callback=/profile");
  }
  const address: Address_Full | null = await prisma.userAddress.findFirst({
    where: { user_id: session.user.id },
    include: { city: true, state: true },
  });

  const order = await getOrders();

  return <Content orders={order} session={session} address={address} />;
};

export default page;
