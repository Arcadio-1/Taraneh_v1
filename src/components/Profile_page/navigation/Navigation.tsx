"use client";
import Link from "next/link";
import React, { ReactNode } from "react";
import HomeIcon from "./icons/HomeIcon";
import OrdersIcon from "./icons/OrdersIcon";
import AddressesIcon from "./icons/AddressesIcon";
import Personal_info from "./icons/Personal_info_icon";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { Role } from "@prisma/client";
import { Session } from "next-auth";

interface LinkType {
  id: string;
  title: string;
  link: string;
  role: Role;
  icon?: ReactNode;
}

const Navigation = () => {
  // const { data } = useSession();
  const links: LinkType[] = [
    {
      id: "1",
      title: "خلاصه فعالیت ها",
      link: "/profile",
      role: Role.USER,
      icon: <HomeIcon className="h-9 w-9 fill-gray-600" />,
    },
    {
      id: "2",
      title: "سفارش ها",
      link: "/profile/orders",
      role: Role.USER,
      icon: <OrdersIcon className="h-9 w-9 fill-gray-600" />,
    },
    {
      id: "3",
      title: " آدرس ها",
      link: "/profile/addresses",
      role: Role.USER,
      icon: <AddressesIcon className="h-9 w-9 fill-gray-600" />,
    },
    {
      id: "4",
      title: "اطلاعات حساب کاربری",
      role: Role.USER,
      link: "/profile/personal-info",
      icon: <Personal_info className="h-9 w-9 fill-gray-600" />,
    },
  ];
  return (
    <ul className="">
      {links.map((item) => {
        return (
          <li key={item.id} className=" hover:bg-gray-100">
            <Link
              href={item.link}
              className="flex items-center gap-2 text-lg border-b-[1px] border-b-gray-600 px-2 py-2 border-opacity-25 mx-2"
            >
              {!!item.icon && item.icon}
              {item.title}
            </Link>
          </li>
        );
      })}
      <li className="border-b-[1px] border-b-gray-600 px-2 py-2 border-opacity-25 hover:bg-gray-100">
        <button
          onClick={() => {
            signOut({ callbackUrl: "/" });
          }}
          className="flex items-center gap-2 text-lg"
        >
          <LogOutIcon className="h-8 w-8" />
          خروج
        </button>
      </li>
    </ul>
  );
};
export default Navigation;
