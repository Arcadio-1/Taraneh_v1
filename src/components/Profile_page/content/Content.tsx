"use client";
import React, { Suspense } from "react";
import Root from "./components/Root/Root";
import { usePathname } from "next/navigation";
import Personal_info from "./components/Personal_info/Personal_info";
import { Session } from "next-auth";
import { Address_Full } from "@/types_validation/type";
import Orders from "./components/Orders/Orders";
import { Order } from "@prisma/client";
import Addresses from "./components/Addresses/Addresses";

interface Props {
  session: Session;
  address: Address_Full | null;
  orders: Order[] | null;
}

const Content = ({ session, address, orders }: Props) => {
  const path = usePathname();
  // const Orders = React.lazy(() => import("./components/Orders/Orders"));

  return (
    <div className="col-span-8 rounded-lg border px-2 py-5 md:col-span-6">
      {path === "/profile" && <Root session={session} orders={orders} />}
      {path === "/profile/personal-info" && (
        <Personal_info session={session} address={address} />
      )}
      {path === "/profile/addresses" && (
        <Addresses user={session} address={address} />
      )}
      {path === "/profile/orders" && <Orders user={session} />}
    </div>
  );
};

export default Content;
