import { TabsContent } from "@/components/Util/shadcn/ui/tabs";
import { Order, OrderStatus } from "@prisma/client";
import React, { Suspense } from "react";
import CartItemSkeleton from "./orderItem/components/CartItemSkeleton";
import EmptyOrder from "./EmptyOrder";
import dynamic from "next/dynamic";

type Props = { orders: Order[] | [] };

type TContentTabObj = {
  item: OrderStatus;
  status: OrderStatus[];
};
const OrderTabContent = ({ orders }: Props) => {
  const OrderItem = dynamic(
    () => import("@/components/Pages/Profile_page/Orders/orderItem/OrderItem"),
    {
      ssr: false,
    },
  );

  const contentTabObg: TContentTabObj[] = [
    {
      item: "IN_PROCESS",
      status: ["IN_PROCESS", "NOT_CONFIRMED", "ON_DELIVERY"],
    },
    {
      item: "CANCELED",
      status: ["CANCELED"],
    },
    {
      item: "DELIVERED",
      status: ["DELIVERED"],
    },
    {
      item: "REJECTED",
      status: ["REJECTED"],
    },
  ];
  return (
    <>
      {contentTabObg.map((content) => {
        return (
          <TabsContent
            className="mx-6 mt-4"
            key={content.item}
            value={content.item}
          >
            {
              <div className="flex flex-col gap-4">
                <Suspense fallback={<CartItemSkeleton />}>
                  {orders.length > 0 ? (
                    <>
                      {orders.map((order) => {
                        if (content.status.includes(order.status))
                          return <OrderItem key={order.id} order={order} />;
                      })}
                    </>
                  ) : (
                    <EmptyOrder />
                  )}
                </Suspense>
              </div>
            }
          </TabsContent>
        );
      })}
    </>
  );
};

export default OrderTabContent;
