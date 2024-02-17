"use client";

import * as React from "react";
import { Command, CommandItem } from "@/components/Util/shadcn/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/Util/shadcn/ui/popover";
import Divider from "@/components/Util/ui/Divider";
import { Session } from "next-auth";
import Link from "next/link";
import Logout from "@mui/icons-material/Logout";
import { Role } from "@prisma/client";
import { signOut } from "next-auth/react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/Util/shadcn/ui/sheet";
import ProfileIcon from "@/components/Util/ui/icons/ProfileIcon";
import ArrowIcon, { Arrow } from "@/components/Util/ui/icons/ArrowIcon";
import AdminDashboardIcon from "@/components/Util/ui/icons/AdminDashboardIcon";

interface Props {
  session: Session;
}

export default function UserMenu({ session }: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div className="hidden md:block">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="flex cursor-pointer items-end">
              <ProfileIcon className="h-9 w-9 fill-dark_4" />
              <div>
                <svg viewBox="0 0 24 24" className="h-8 w-8">
                  <path d="M7 10l5 5 5-5H7z"></path>
                </svg>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="w-[200px] !bg-transparent p-0 !shadow-transparent"
          >
            <Command className="flex flex-col rounded-lg border py-2 shadow-lg">
              <CommandItem
                className="py-3 hover:!bg-gray-50"
                onSelect={() => {
                  setOpen(false);
                }}
              >
                <Link
                  className="flex w-full items-center justify-between px-2"
                  href={"/profile"}
                >
                  <div className="flex items-start gap-2">
                    {!session.user.name && !session.user.family && (
                      <span className="font-iransansnum text-xl">
                        {session.user.phone}
                      </span>
                    )}
                    {session.user.name && session.user.family && (
                      <span className=" text-md font-iranyekan_bold text-xl text-dark_4">
                        {session.user.name} {session.user.family}
                      </span>
                    )}
                  </div>
                  <ArrowIcon
                    classes="h-4 w-4 fill-dark_4"
                    direction={Arrow.left}
                  />
                </Link>
              </CommandItem>
              <Divider />
              <CommandItem
                className="py-3 hover:!bg-gray-50"
                onSelect={() => {
                  setOpen(false);
                  signOut();
                }}
              >
                <div className="flex w-full cursor-pointer items-center justify-between px-2">
                  <div className="flex items-start gap-2">
                    <Logout
                      className="h-6 w-6 !fill-dark_4"
                      fontSize="medium"
                    />
                    <span className="text-md font-iranyekan_bold text-lg text-dark_4">
                      خروج از حساب کاربری
                    </span>
                  </div>
                </div>
              </CommandItem>
              {session.user.role === Role.ADMIN && (
                <CommandItem
                  className="py-3 hover:!bg-gray-50"
                  onSelect={(currentValue) => {
                    setOpen(false);
                  }}
                >
                  <Link
                    className="flex w-full items-center justify-between px-2"
                    href={"/dashboard"}
                  >
                    <div className="flex items-start gap-2">
                      <AdminDashboardIcon className="h-6 w-6 fill-dark_4" />
                      <span className="text-md font-iranyekan_bold text-lg text-dark_4">
                        پنل مدیریت
                      </span>
                    </div>
                    <ArrowIcon
                      classes="h-4 w-4 fill-dark_4"
                      direction={Arrow.left}
                    />
                  </Link>
                </CommandItem>
              )}
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="block md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <div className="flex cursor-pointer items-end">
              <ProfileIcon className="h-9 w-9 fill-dark_4" />
              <div>
                <svg viewBox="0 0 24 24" className="h-8 w-8">
                  <path d="M7 10l5 5 5-5H7z"></path>
                </svg>
              </div>
            </div>
          </SheetTrigger>
          <SheetContent
            className="flex flex-col gap-6 rounded-lg border pt-[5rem] shadow-lg"
            side={"left"}
          >
            <SheetClose asChild>
              <Link
                className="flex w-full items-center justify-between px-2"
                href={"/profile"}
              >
                <div className="flex items-start gap-2">
                  {!session.user.name && !session.user.family && (
                    <span className="font-iransansnum text-xl">
                      {session.user.phone}
                    </span>
                  )}
                  {session.user.name && session.user.family && (
                    <span className=" text-md font-iranyekan_bold text-xl text-dark_4">
                      {session.user.name} {session.user.family}
                    </span>
                  )}
                </div>
                <ArrowIcon
                  classes="h-4 w-4 fill-dark_4"
                  direction={Arrow.left}
                />
              </Link>
            </SheetClose>
            <Divider />
            <SheetClose asChild>
              <div
                onClick={() => {
                  signOut();
                }}
                className="flex w-full cursor-pointer items-center justify-between px-2"
              >
                <div className="flex items-start gap-2">
                  <Logout className=" h-6 w-6 fill-dark_4" fontSize="medium" />
                  <span className="text-md font-iranyekan_bold text-lg text-dark_4">
                    خروج از حساب کاربری
                  </span>
                </div>
              </div>
            </SheetClose>
            {session.user.role === Role.ADMIN && (
              <SheetClose asChild>
                <Link
                  className="flex w-full items-center justify-between px-2"
                  href={"/dashboard"}
                >
                  <div className="flex items-start gap-2">
                    <AdminDashboardIcon className="h-6 w-6 fill-dark_4" />
                    <span className="text-md font-iranyekan_bold text-lg text-dark_4">
                      پنل مدیریت
                    </span>
                  </div>
                  <ArrowIcon
                    classes="h-4 w-4 fill-dark_4"
                    direction={Arrow.left}
                  />
                </Link>
              </SheetClose>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
