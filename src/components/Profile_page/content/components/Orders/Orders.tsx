import { Order, OrderStatus } from "@prisma/client";
import React, { Suspense, useEffect, useState } from "react";
import { Tabs, TabsContent } from "@/components_shadcn/ui/tabs";
import OrderTabs from "./components/OrderTabs";
import EmptyOrder from "./components/EmptyOrder";
import { getOrders } from "@/actions/manageOrders";
import { Session } from "next-auth";
import CartItemSkeleton from "./components/orderItem/components/CartItemSkeleton";
import ArrowLongIcon, { Arrow } from "@/components/Util/icons/ArrowLongIcon";
import Link from "next/link";

interface Props {
  // orders: Order[] | null;
  user: Session;
}
export const revalidate = true;
export interface TabListInterface {
  id: string;
  label: string;
  status: OrderStatus;
}

const Orders = ({ user }: Props) => {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(true);
  const OrderItem = React.lazy(
    () => import("./components/orderItem/OrderItem"),
  );

  useEffect(() => {
    const geter = async () => {
      const orderr = await getOrders();
      setLoading(false);
      if (orderr) {
        setOrders((prev) => {
          return (prev = orderr);
        });
      }
    };
    geter();
  }, [user.user]);

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
      <div>
        <Tabs
          className=" flex flex-col gap-6"
          defaultValue={OrderStatus.IN_PROCESS}
          dir="rtl"
        >
          <OrderTabs orders={orders} />
          <TabsContent
            className="mx-6 mt-4"
            key={OrderStatus.IN_PROCESS}
            value={OrderStatus.IN_PROCESS}
          >
            {
              <div className="flex flex-col gap-4">
                <Suspense fallback={<CartItemSkeleton />}>
                  {orders?.length ? (
                    <>
                      {orders?.map((order) => {
                        if (
                          order.status === OrderStatus.IN_PROCESS ||
                          order.status === OrderStatus.ON_DELIVERY ||
                          order.status === OrderStatus.NOT_CONFIRMED
                        )
                          return <OrderItem key={order.id} order={order} />;
                      })}
                    </>
                  ) : (
                    <>{!loading && <EmptyOrder />}</>
                  )}
                </Suspense>
              </div>
            }
          </TabsContent>

          <TabsContent
            className="mx-6 mt-4"
            key={OrderStatus.DELIVERED}
            value={OrderStatus.DELIVERED}
          >
            {
              <div className="flex flex-col gap-4">
                <Suspense fallback={<CartItemSkeleton />}>
                  {orders?.length ? (
                    <>
                      {orders?.map((order) => {
                        if (order.status === OrderStatus.DELIVERED)
                          return <OrderItem key={order.id} order={order} />;
                      })}
                    </>
                  ) : (
                    <>{!loading && <EmptyOrder />}</>
                  )}
                </Suspense>
              </div>
            }
          </TabsContent>
          <TabsContent
            className="mx-6 mt-4 "
            key={OrderStatus.CANCELED}
            value={OrderStatus.CANCELED}
          >
            {
              <div className="flex flex-col gap-4">
                <Suspense fallback={<CartItemSkeleton />}>
                  {orders?.length ? (
                    <>
                      {orders?.map((order) => {
                        if (order.status === OrderStatus.CANCELED)
                          return <OrderItem key={order.id} order={order} />;
                      })}
                    </>
                  ) : (
                    <>{!loading && <EmptyOrder />}</>
                  )}
                </Suspense>
              </div>
            }
          </TabsContent>
          <TabsContent
            className="mx-6 mt-4 "
            key={OrderStatus.REJECTED}
            value={OrderStatus.REJECTED}
          >
            {
              <div className="flex flex-col gap-4">
                <Suspense fallback={<CartItemSkeleton />}>
                  {orders?.length ? (
                    <>
                      {orders?.map((order) => {
                        if (order.status === OrderStatus.REJECTED)
                          return <OrderItem key={order.id} order={order} />;
                      })}
                    </>
                  ) : (
                    <>{!loading && <EmptyOrder />}</>
                  )}
                </Suspense>
              </div>
            }
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Orders;
