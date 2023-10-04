"use client";
import { Avatar } from "@mui/material";
import { Edit3Icon } from "lucide-react";
// import { User } from "@prisma/client";
import { Session, User } from "next-auth";
import Link from "next/link";
import React from "react";

interface Props {
  session: Session;
}

const User_card = ({ session }: Props) => {
  const { user } = session;
  return (
    <div className="flex items-center justify-between py-4 px-3 border-b-[1.3px] m-2">
      <div className="flex items-center gap-3">
        {user.name && user.family && (
          <div className="flex flex-col gap-1">
            <p>
              <span className="font-iranyekan_bold text-xl text-dark_2">
                {user.name}
              </span>
              <span> </span>
              <span className="font-iranyekan_bold text-xl text-dark_2">
                {user.family}
              </span>
            </p>
            <p className="font-iransansnum text-xl text-dark_4">{user.phone}</p>
          </div>
        )}
        {!user.name || (!user.family && <p>{user.phone}</p>)}
      </div>
      <Link href={"/profile/personal-info"}>
        <Edit3Icon className="stroke-g1_7 h-6 w-6" />
      </Link>
    </div>
  );
};

export default User_card;
