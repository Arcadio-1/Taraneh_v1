import { getOrders } from "@/actions/ordering/order/getOrders";
import ArrowLongIcon, { Arrow } from "@/components/Util/ui/icons/ArrowLongIcon";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { OrderStatus } from "@prisma/client";
import React from "react";
import { Tabs } from "@/components/Util/shadcn/ui/tabs";
import OrderTriggerList from "@/components/Pages/Profile_page/Orders/OrderTriggerList";
import RefreshButton from "@/components/Util/components/refreshButton/RefreshButton";
import OrderTabContent from "@/components/Pages/Profile_page/Orders/OrderTabContent";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/users/login?callback=/profile/orders");
  }
  const requestOrders = await getOrders();
  if (!requestOrders.ok) {
    return (
      <div>
        <div className="flex items-center justify-start gap-2 px-3">
          <Link href={`/profile`}>
            <ArrowLongIcon
              classes="h-10 w-10 md:hidden fill-dark_3"
              direction={Arrow.right}
            />
          </Link>
          <h1 className=" font-iranyekan_bold text-lg text-dark_3">
            تاریخچه سفارشات
          </h1>
        </div>
        <div className="mt-4 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg px-4 py-4">
            <div className="flex gap-2">
              <h1 className="text-2xl">{requestOrders.message}</h1>
            </div>
            <RefreshButton />
          </div>
        </div>
      </div>
    );
  }
  const { orders } = requestOrders;

  return (
    <div>
      <div className="flex items-center justify-start gap-2 px-3">
        <Link href={`/profile`}>
          <ArrowLongIcon
            classes="h-10 w-10 md:hidden fill-dark_3"
            direction={Arrow.right}
          />
        </Link>
        <h1 className=" font-iranyekan_bold text-lg text-dark_3">
          تاریخچه سفارشات
        </h1>
      </div>
      <Tabs
        className=" flex flex-col gap-6"
        defaultValue={OrderStatus.IN_PROCESS}
        dir="rtl"
      >
        <OrderTriggerList orders={orders} />
        <OrderTabContent orders={orders} />
      </Tabs>
    </div>
  );
};

export default page;
