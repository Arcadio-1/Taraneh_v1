"use client";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";

const LogoutButton = () => {
  return (
    <button
      onClick={() => {
        signOut({ callbackUrl: "/" });
      }}
      className="flex items-center gap-2 text-lg"
    >
      <LogOutIcon className="h-8 w-8" />
      خروج
    </button>
  );
};

export default LogoutButton;
