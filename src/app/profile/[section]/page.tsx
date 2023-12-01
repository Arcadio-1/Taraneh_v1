import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/lib/auth/authOptions";
import { redirect } from "next/navigation";
import Aside from "@/components/Profile_page/side_navaigation/Aside";
import Content from "@/components/Profile_page/content/Content";
import { prisma } from "@/lib/db/prisma";
import { Address_Full } from "@/types/type";
import { getOrders } from "@/lib/actions/manageOrders";

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
      <div className="hidden col-span-2 md:block">
        <Aside session={session} />
      </div>
      <Content orders={order} session={session} address={address} />
    </div>
  );
};

export default page;
