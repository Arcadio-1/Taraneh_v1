import { Order, OrderStatus } from "@prisma/client";
import React, { Suspense, useEffect, useState } from "react";
import { Tabs, TabsContent } from "@/components_shadcn/ui/tabs";
import OrderTabs from "./components/OrderTabs";
import EmptyOrder from "./components/EmptyOrder";
import { getOrders } from "@/lib/actions/manageOrders";
import { Session } from "next-auth";
import CartItemSkeleton from "./components/orderItem/components/CartItemSkeleton";

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
    () => import("./components/orderItem/OrderItem")
  );

  useEffect(() => {
    const geter = async () => {
      const orderr = await getOrders();
      setLoading(false);
      console.log(orderr);
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
      <h1 className="px-3 text-lg">تاریخچه سفارشات</h1>
      <div>
        <Tabs
          className=" flex flex-col gap-6"
          defaultValue={OrderStatus.IN_PROCESS}
          dir="rtl"
        >
          <OrderTabs orders={orders} />
          <TabsContent
            className="mt-4 mx-6"
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
            className="mt-4 mx-6"
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
            className="mt-4 mx-6 "
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
            className="mt-4 mx-6 "
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
