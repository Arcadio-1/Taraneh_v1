import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Aside from "@/components/Profile_page/side_navaigation/Aside";
import Content from "@/components/Profile_page/content/Content";
import { prisma } from "@/lib/db/prisma";
import { Address_Full } from "@/types/type";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/users/login?callback=/profile");
  }

  const address: Address_Full | null = await prisma.userAddress.findFirst({
    where: { user_id: session.user.id },
    include: { city: true, state: true },
  });

  return (
    <div className="grid gap-4 grid-cols-[repeat(8,minmax(0,1fr))] max-w-[1024px] mx-auto mt-6">
      <Aside session={session} />
      <Content session={session} address={address} />
    </div>
  );
};

export default page;
