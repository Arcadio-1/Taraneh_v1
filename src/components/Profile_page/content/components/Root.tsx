import ArrowIcon, { Arrow } from "@/components/Util/icons/ArrowIcon";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import processingImage from "@/assets/images/profile/status-processing.svg";
import deliveredImage from "@/assets/images/profile/status-delivered.svg";
import returnedImage from "@/assets/images/profile/status-returned.svg";
import { getOrders } from "@/lib/actions/manageOrders";
import { Order, OrderStatus } from "@prisma/client";

interface Props {
  user_id: string;
}

const Root = ({ user_id }: Props) => {
  const [orders, setOrders] = useState<Order[] | []>([]);
  const [inProcess, setInProcess] = useState<Order[] | []>([]);
  const [delivered, setDelivered] = useState<Order[] | []>([]);
  const [rejected, setrejected] = useState<Order[] | []>([]);

  useEffect(() => {
    if (orders) {
      setInProcess([]);
      setDelivered([]);
      setrejected([]);
      orders.map((order) => {
        switch (order.status) {
          case OrderStatus.IN_PROCESS:
            setInProcess((prev) => (prev = [...prev, order]));
            break;
          case OrderStatus.DELIVERED:
            setDelivered((prev) => (prev = [...prev, order]));
            break;
          case OrderStatus.REJECTED:
            setrejected((prev) => (prev = [...prev, order]));
            break;
          default:
            break;
        }
      });
    }
  }, [orders]);

  useEffect(() => {
    const getOrderi = async () => {
      const orderss = await getOrders(user_id);
      setOrders(orderss);
    };
    getOrderi();
  }, [user_id]);

  return (
    <div className="flex flex-col gap-10 px-4">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xl font-iranyekan_bold">سفارش های من</p>
        </div>
        <div>
          <Link href={"profile/orders"} className="flex items-center gap-2">
            مشاهده همه
            <ArrowIcon direction={Arrow.left} classes="h-4 w-4" />
          </Link>
        </div>
      </div>
      <div>
        <ul className="flex">
          <li className="flex items-center gap-3 grow border-l last:border-r-transparent px-6">
            <Image src={processingImage} width={40} height={40} alt="جاری" />
            <div className="flex flex-col gap-2">
              <p className="flex gap-2 items-center">
                <span className="font-iransansnum font-bold">
                  {inProcess.length}
                </span>
                <span className="text-lg font-iranyekan_bold">سفارش</span>
              </p>
              <span className="font-iransansbold text-dark_4">جاری</span>
            </div>
          </li>
          <li className="flex items-center gap-3 grow border-l last:border-r-transparent px-6">
            <Image src={deliveredImage} width={40} height={40} alt="جاری" />
            <div className="flex flex-col gap-2">
              <p className="flex gap-2 items-center">
                <span className="font-iransansnum font-bold">
                  {delivered.length}
                </span>
                <span className="text-lg font-iranyekan_bold">سفارش</span>
              </p>
              <span className="font-iransansbold text-dark_4">تحویل شده</span>
            </div>
          </li>
          <li className="flex items-center gap-3 grow border-l last:border-r-transparent px-6">
            <Image src={returnedImage} width={40} height={40} alt="جاری" />
            <div className="flex flex-col gap-2">
              <p className="flex gap-2 items-center">
                <span className="font-iransansnum font-bold">
                  {rejected.length}
                </span>
                <span className="text-lg font-iranyekan_bold">سفارش</span>
              </p>
              <span className="font-iransansbold text-dark_4">مرجوع شده</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Root;
