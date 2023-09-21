import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import Aside from "@/components/Profile_page/side_navaigation/Aside";
import Content from "@/components/Profile_page/content/Content";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/users/login?callback=/profile");
  }
  // if(session.user.)
  return (
    <div className="grid grid-cols-[repeat(7,minmax(0,1fr))]">
      <Aside session={session} />
      <Content session={session} />
    </div>
  );
};

export default page;
