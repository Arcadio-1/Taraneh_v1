"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { Address_Full } from "@/types_validation/type";
import { Order } from "@prisma/client";
import dynamic from "next/dynamic";

const Addresses = dynamic(() => import("./components/Addresses/Addresses"), {
  ssr: false,
});
const User_info = dynamic(() => import("./components/User_info/User_info"), {
  ssr: false,
});
const Orders = dynamic(() => import("./components/Orders/Orders"), {
  ssr: false,
});
const Root = dynamic(() => import("./components/Root/Root"), {
  ssr: false,
});

interface Props {
  session: Session;
  address: Address_Full | null;
  orders: Order[] | [];
}

const Content = ({ session, address, orders }: Props) => {
  const path = usePathname();

  return (
    <div className="col-span-8 rounded-lg border px-2 py-5 md:col-span-6">
      {path === "/profile" && <Root session={session} orders={orders} />}
      {path === "/profile/user-info" && (
        <User_info session={session} address={address} />
      )}
      {path === "/profile/addresses" && (
        <Addresses user={session} address={address} />
      )}
      {path === "/profile/orders" && <Orders user={session} />}
    </div>
  );
};

export default Content;
