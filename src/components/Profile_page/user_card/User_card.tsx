"use client";
import { Avatar } from "@mui/material";
import { Edit3Icon } from "lucide-react";
// import { User } from "@prisma/client";
import { Session, User } from "next-auth";
import React from "react";

interface Props {
  session: Session;
}

const User_card = ({ session }: Props) => {
  const { user } = session;
  return (
    <div className="flex items-center justify-between py-4 px-3 border-b-2 m-2">
      <div className="flex items-center gap-3">
        <Avatar />
        <p>
          {user.name && <span>{user.name}</span>}
          {user.family && <span>{user.family}</span>}
        </p>
        <p>{user.phone}</p>
      </div>
      <div>
        <Edit3Icon className="stroke-g1_7 h-7 w-7" />
      </div>
    </div>
  );
};

export default User_card;
