import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Aside from "@/components/Profile_page/side_navaigation/Aside";
import Content from "@/components/Profile_page/content/Content";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/users/login?callback=/profile");
  }
  // console.log(session);
  return (
    <div className="grid grid-cols-[repeat(7,minmax(0,1fr))]">
      <Aside session={session} />
      {/* <p>{se }</p> */}
      <Content session={session} />
    </div>
  );
};

export default page;
