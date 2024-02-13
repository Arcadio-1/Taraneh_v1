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
import ArrowIcon, { Arrow } from "@/components/Util/ui/icons/ArrowIcon";

interface LinkType {
  id: string;
  title: string;
  link: string;
  role: Role;
  icon?: ReactNode;
}
interface Props {
  root?: boolean;
}

const Navigation = ({ root = false }: Props) => {
  // const { data } = useSession();
  const links: LinkType[] = [
    {
      id: "1",
      title: "خلاصه فعالیت ها",
      link: "/profile",
      role: Role.USER,
      icon: <HomeIcon className="h-8 w-8 fill-gray-600" />,
    },
    {
      id: "2",
      title: "سفارش ها",
      link: "/profile/orders",
      role: Role.USER,
      icon: <OrdersIcon className="h-8 w-8 stroke-gray-600" />,
    },
    {
      id: "3",
      title: " آدرس ها",
      link: "/profile/addresses",
      role: Role.USER,
      icon: <AddressesIcon className="h-8 w-8 fill-gray-600" />,
    },
    {
      id: "4",
      title: "اطلاعات حساب کاربری",
      role: Role.USER,
      link: "/profile/user-info",
      icon: <Personal_info className="h-8 w-8 fill-gray-600" />,
    },
  ];
  return (
    <ul className="p-2 ">
      {links.map((item) => {
        return (
          <li
            key={item.id}
            className={`${
              root && item.id === "1" ? "hidden" : ""
            } border-b-[1px] border-b-gray-100 last:bg-red-600 hover:bg-gray-100`}
          >
            <Link
              href={item.link}
              className="mx-2 flex justify-between px-2 py-2"
            >
              <div className="flex items-center gap-2">
                {!!item.icon && item.icon}
                <span className="text-lg">{item.title}</span>
              </div>
              <ArrowIcon classes="h-5 w-5 fill-dark_4" direction={Arrow.left} />
            </Link>
          </li>
        );
      })}
      <li className=" px-2 py-2 hover:bg-gray-100">
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
