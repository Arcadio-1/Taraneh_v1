"use client";

import * as React from "react";
import { Command, CommandItem } from "@/components_shadcn/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components_shadcn/ui/popover";
import { Divider } from "@mui/material";
import { Session } from "next-auth";
import Link from "next/link";
import ArrowIcon, { Arrow } from "../../icons/ArrowIcon";
import Logout from "@mui/icons-material/Logout";
import ProfileIcon from "../../icons/ProfileIcon";
import { Role } from "@prisma/client";
import AdminDashboardIcon from "../../icons/AdminDashboardIcon";
import { signOut } from "next-auth/react";

interface Props {
  session: Session;
}

export default function UserMenu({ session }: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex items-end cursor-pointer">
          <ProfileIcon classes="w-9 h-9 fill-dark_4" />
          <div>
            <svg viewBox="0 0 24 24" className="w-8 h-8">
              <path d="M7 10l5 5 5-5H7z"></path>
            </svg>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 ml-28 !bg-transparent !shadow-transparent">
        <Command className="shadow-lg border rounded-lg flex flec-col gap-6 py-5">
          <CommandItem
            onSelect={() => {
              setOpen(false);
            }}
          >
            <Link
              className="flex justify-between items-center w-full px-2"
              href={"/profile"}
            >
              <div className="flex gap-2 items-start">
                {!session.user.name && !session.user.family && (
                  <span className="font-iransansnum">{session.user.phone}</span>
                )}
                {session.user.name && session.user.family && (
                  <span className=" text-md text-dark_4 font-iranyekan_bold text-xl">
                    {session.user.name} {session.user.family}
                  </span>
                )}
              </div>
              <ArrowIcon classes="h-4 w-4 fill-dark_4" direction={Arrow.left} />
            </Link>
          </CommandItem>
          <Divider />
          <CommandItem
            onSelect={() => {
              setOpen(false);
              signOut();
            }}
          >
            <div className="flex justify-between items-center w-full px-2 cursor-pointer">
              <div className="flex gap-2 items-start">
                <Logout className=" h-6 w-6 fill-dark_4" fontSize="medium" />
                <span className="text-md text-dark_4 font-iranyekan_bold text-lg">
                  خروج از حساب کاربری
                </span>
              </div>
            </div>
          </CommandItem>
          {session.user.role === Role.ADMIN && (
            <CommandItem
              onSelect={(currentValue) => {
                setOpen(false);
              }}
            >
              <Link
                className="flex justify-between items-center w-full px-2"
                href={"/dashboard"}
              >
                <div className="flex gap-2 items-start">
                  <AdminDashboardIcon classess="h-6 w-6 fill-dark_4" />
                  <span className="text-md text-dark_4 font-iranyekan_bold text-lg">
                    پنل مدیریت
                  </span>
                </div>
                <ArrowIcon
                  classes="h-4 w-4 fill-dark_4"
                  direction={Arrow.left}
                />
              </Link>
              <Divider className="my-2" />
            </CommandItem>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
