import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import Aside from "@/components/Profile_page/side_navaigation/Aside";
import Content from "@/components/Profile_page/content/Content";
import { Address_Full } from "@/types/type";
import { prisma } from "@/lib/db/prisma";
import { getOrders } from "@/lib/actions/manageOrders";
import { authOptions } from "@/lib/auth/authOptions";

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

  // if(session.user.)
  return (
    <div className="grid gap-4 grid-cols-[repeat(8,minmax(0,1fr))] max-w-[1124px] mx-auto mt-6">
      <Aside session={session} />
      <Content orders={order} session={session} address={address} />
    </div>
  );
};

export default page;
