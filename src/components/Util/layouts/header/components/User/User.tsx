import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import React from "react";
import UserMenu from "./UserMenu";
import Log from "./Log";

export const User = async () => {
  const session = await getServerSession(authOptions);
  return <>{session ? <UserMenu session={session} /> : <Log />}</>;
};
