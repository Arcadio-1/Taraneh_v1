"use client";
import React from "react";
import Root from "./components/Root";
import { usePathname } from "next/navigation";
import Personal_info from "./components/Personal_info/Personal_info";
// import { Session } from "@prisma/client";
// import { Session } from "inspector";
// import { Session } from "next-auth";
import { Session } from "next-auth";

interface Props {
  session: Session;
}

const Content = ({ session }: Props) => {
  const path = usePathname();
  // console.log("session", session.role);
  return (
    <div className="col-span-5 border border-red-800 p-5">
      {path === "/profile" && <Root />}
      {path === "/profile/personal-info" && <Personal_info session={session} />}
    </div>
  );
};

export default Content;
