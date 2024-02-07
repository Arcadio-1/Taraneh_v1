import { authOptions } from "@/lib/auth/authOptions";
import Order from "@/components/Pages/Profile_page/Order_section/Order";
import Aside from "@/components/Pages/Profile_page/side_navaigation/Aside";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import React from "react";

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

  const order = async () => {
    try {
      const ord = await prisma.order.findUnique({ where: { id: order_id } });
      if (!ord) {
        return notFound();
      }
      return ord;
    } catch (error) {
      return notFound();
    }
  };

  return <Order order={await order()} />;
};

export default page;
