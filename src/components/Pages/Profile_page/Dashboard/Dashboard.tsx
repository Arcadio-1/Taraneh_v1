import React from "react";

import { Order, Role } from "@prisma/client";
import { Session } from "next-auth";
import User_card from "../util/user_card/User_card";
import Aside from "../util/aside/Aside";
import OrdringOverView from "./components/overView/OrdringOverView";
import { T_panelAsideLinks } from "@/types_validation/type";
import HomeIcon from "@/components/Pages/Profile_page/util/aside/navigation/icons/HomeIcon";
import OrdersIcon from "@/components/Pages/Profile_page/util/aside/navigation/icons/OrdersIcon";
import AddressesIcon from "@/components/Pages/Profile_page/util/aside/navigation/icons/AddressesIcon";
import Personal_info_icon from "@/components/Pages/Profile_page/util/aside/navigation/icons/Personal_info_icon";
interface Props {
  orders: Order[] | [];
  session: Session;
}

const Dashboard = ({ orders, session }: Props) => {
  const aside_links: T_panelAsideLinks[] = [
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
      icon: <Personal_info_icon className="h-8 w-8 fill-gray-600" />,
    },
  ];
  return (
    <div className="">
      <User_card session={session} />
      <OrdringOverView orders={orders} />
      <div className="block md:hidden">
        <Aside links={aside_links} dashboard={true} session={session} />
      </div>
    </div>
  );
};

export default Dashboard;
