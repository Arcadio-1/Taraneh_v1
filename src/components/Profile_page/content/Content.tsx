"use client";
import React from "react";
import Root from "./components/Root";
import { usePathname } from "next/navigation";
import Personal_info from "./components/Personal_info/Personal_info";
import { Session } from "next-auth";
import { Address_Full } from "@/types/type";

interface Props {
  session: Session;
  address: Address_Full | null;
}

const Content = ({ session, address }: Props) => {
  const path = usePathname();
  return (
    <div className="col-span-6 border rounded-lg px-2 py-5">
      {path === "/profile" && <Root user_id={session.user.id} />}
      {path === "/profile/personal-info" && (
        <Personal_info session={session} address={address} />
      )}
    </div>
  );
};

export default Content;
