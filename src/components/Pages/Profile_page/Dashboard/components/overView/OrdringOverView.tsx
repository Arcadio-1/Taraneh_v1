"use client";
import ArrowIcon, { Arrow } from "@/components/Util/ui/icons/ArrowIcon";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import processingImage from "@/assets/images/profile/status-processing.svg";
import deliveredImage from "@/assets/images/profile/status-delivered.svg";
import returnedImage from "@/assets/images/profile/status-returned.svg";
import { Order } from "@prisma/client";

type Props = {
  orders: Order[] | [];
};

const OrdringOverView = ({ orders }: Props) => {
  const [inProcess, setInProcess] = useState<number>(0);
  const [delivered, setDelivered] = useState<number>(0);
  const [rejected, setRejected] = useState<number>(0);

  useEffect(() => {
    setInProcess(0);
    setDelivered(0);
    setRejected(0);
    for (const value of orders) {
      switch (value.status) {
        case "REJECTED": {
          setRejected((prev) => {
            return (prev = prev + 1);
          });
          break;
        }
        case "DELIVERED": {
          setDelivered((prev) => {
            return (prev = prev + 1);
          });
          break;
        }
        case "IN_PROCESS": {
          setInProcess((prev) => {
            return (prev = prev + 1);
          });
          break;
        }
        case "NOT_CONFIRMED": {
          setInProcess((prev) => {
            return (prev = prev + 1);
          });
          break;
        }
      }
    }
  }, [orders]);

  return (
    <div className="flex flex-col gap-10 px-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-iranyekan_bold text-xl">سفارش های من</p>
        </div>
        <div>
          <Link href={"profile/orders"} className="flex items-center gap-2">
            مشاهده همه
            <ArrowIcon direction={Arrow.left} classes="h-4 w-4" />
          </Link>
        </div>
      </div>
      <div>
        <section className="flex">
          <div className="flex grow flex-col items-center px-6 md:flex-row md:gap-3">
            <div className="relative">
              <Image src={processingImage} width={40} height={40} alt="جاری" />
              <span className="absolute bottom-0 left-1 size-6 rounded-lg bg-slate-100 px-[5px] text-center font-iransansnum text-black md:hidden ">
                {inProcess}
              </span>
            </div>
            <div className="flex flex-col md:gap-2">
              <span className="font-iransansbold text-dark_4">جاری</span>
              <p className="hidden items-center gap-2 md:flex">
                <span className="font-iransansnum font-bold">{inProcess}</span>
                <span className="font-iranyekan_bold text-lg">سفارش</span>
              </p>
            </div>
          </div>
          <div className="w-[1px] bg-gray-200"></div>
          <div className="flex grow flex-col items-center px-6 md:flex-row md:gap-3">
            <div className="relative">
              <Image src={deliveredImage} width={40} height={40} alt="جاری" />
              <span className="absolute bottom-0 left-1 size-6 rounded-lg bg-slate-100 px-[5px] text-center font-iransansnum text-black md:hidden ">
                {delivered}
              </span>
            </div>
            <div className="flex flex-col md:gap-2">
              <span className="font-iransansbold text-dark_4">تحویل شده</span>
              <p className="hidden items-center gap-2 md:flex">
                <span className="font-iransansnum font-bold">{delivered}</span>
                <span className="font-iranyekan_bold text-lg">سفارش</span>
              </p>
            </div>
          </div>
          <div className="w-[1px] bg-gray-200"></div>
          <div className="flex grow flex-col items-center px-6 md:flex-row md:gap-3">
            <div className="relative">
              <Image src={returnedImage} width={40} height={40} alt="جاری" />
              <span className="absolute bottom-0 left-1 size-6 rounded-lg bg-slate-100 px-[5px] text-center font-iransansnum text-black md:hidden ">
                {rejected}
              </span>
            </div>
            <div className="flex flex-col md:gap-2">
              <span className="font-iransansbold text-dark_4">مرجوع شده</span>
              <p className="hidden items-center gap-2 md:flex">
                <span className="font-iransansnum font-bold">{rejected}</span>
                <span className="font-iranyekan_bold text-lg">سفارش</span>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OrdringOverView;
